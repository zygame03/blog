// frontend/src/pages/admin/Z_AdminArticle.jsx
import { useEffect, useMemo, useState } from 'react';
import { Card, Table, Button, Space, Modal, Form, Input, message, Tag, Popconfirm } from 'antd';
import { adminArticleService } from '../../services/articleService';
import { useAdminArticleActions } from '../../hooks/useAdminArticleActions';

const { Search } = Input;

const emptyForm = { title: '', desc: '', content: '', tags: '' };

const Z_AdminArticles = () => {
  const [list, setList] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [keyword, setKeyword] = useState('');
  const [loading, setLoading] = useState(false);

  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form] = Form.useForm();

  const { createArticle, updateArticle, deleteArticle, restoreArticle, loading: actionLoading } = useAdminArticleActions();

  const fetchList = async (p = page, ps = pageSize, k = keyword) => {
    setLoading(true);
    try {
      const res = await adminArticleService.adminGetArticles(p, ps, k);
      const data = res?.data?.data;
      let items = [];
      let count = 0;
      if (Array.isArray(data)) {
        items = data;
        count = data.length;
      } else {
        items = data?.list ?? data?.items ?? data?.data ?? [];
        count = data?.total ?? data?.count ?? items.length;
      }
      setList(items);
      setTotal(count);
    } catch (e) {
      message.error('加载失败');
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchList(1, pageSize, keyword);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSearch = (val) => {
    setKeyword(val);
    setPage(1);
    fetchList(1, pageSize, val);
  };

  const openCreate = () => {
    setEditing(null);
    form.setFieldsValue(emptyForm);
    setOpen(true);
  };

  const openEdit = (record) => {
    setEditing(record);
    form.setFieldsValue({
      title: record.title ?? '',
      desc: record.desc ?? '',
      content: record.content ?? '',
      authorName: 'zygame',
      views: 0,
      tags: typeof record.tags === 'string' ? record.tags.split(',').map(t => t.trim()).filter(Boolean).join(',') : '',
      cover: '',
      status: 0,
    });
    setOpen(true);
  };

  const handleSubmit = async () => {
    const values = await form.validateFields();
    const payload = {
      title: values.title,
      desc: values.desc,
      content: values.content,
      tags: typeof values.tags === 'string' ? values.tags.split(',').map(t => t.trim()).filter(Boolean) : [],
    };
    try {
      if (editing?.id) {
        await updateArticle(editing.id, payload);
      } else {
        await createArticle(payload);
      }
      setOpen(false);
      setEditing(null);
      fetchList(page, pageSize, keyword);
    } catch (e) {
      message.error('保存失败');
      console.error(e);
    }
  };

  // 删除文章
  const handleDelete = async (record) => {
    try {
      await deleteArticle(record.id);
      fetchList(page, pageSize, keyword);
    } catch (e) {
      message.error('删除失败');
      console.error(e);
    }
  };

  // 恢复文章
  const handleRestore = async (record) => {
    try {
      await restoreArticle(record.id);
      fetchList(page, pageSize, keyword);
    } catch (e) {
      message.error('恢复失败');
      console.error(e);
    }
  };

  const columns = useMemo(() => [
    { title: 'ID', dataIndex: 'id', width: 80 },
    { title: '标题', dataIndex: 'title', ellipsis: true },
    { title: '摘要', dataIndex: 'desc', ellipsis: true },
    {
      title: '标签',
      dataIndex: 'tags',
      width: 220,
      render: (val) => {
        const arr = typeof val === 'string' ? val.split(',').filter(Boolean) : [];
        return arr.length ? arr.map((t, i) => <Tag key={i}>{t}</Tag>) : <span>-</span>;
      }
    },
    {
      title: '状态',
      dataIndex: 'is_delete',
      width: 80,
      render: (isDelete) => (
        <Tag color={isDelete ? 'red' : 'green'}>
          {isDelete ? '已删除' : '正常'}
        </Tag>
      )
    },
    {
      title: '操作',
      width: 200,
      render: (_, record) => (
        <Space>
          {!record.is_delete && (
            <Button type="link" onClick={() => openEdit(record)}>编辑</Button>
          )}
          
          {record.is_delete ? (
            <Popconfirm 
              title="确认恢复这篇文章？" 
              onConfirm={() => handleRestore(record)}
              okText="恢复"
              cancelText="取消"
            >
              <Button type="link" style={{ color: '#52c41a' }}>
                恢复
              </Button>
            </Popconfirm>
          ) : (
            <Popconfirm 
              title="确认删除这篇文章？" 
              onConfirm={() => handleDelete(record)}
              okText="删除"
              cancelText="取消"
            >
              <Button type="link" danger>
                删除
              </Button>
            </Popconfirm>
          )}
        </Space>
      )
    }
  ], [list]);

  return (
    <Card
      title="文章管理"
      extra={
        <Space>
          <Search
            placeholder="搜索标题/摘要"
            allowClear
            onSearch={onSearch}
            style={{ width: 260 }}
          />
          <Button type="primary" onClick={openCreate}>新建文章</Button>
        </Space>
      }
    >
      <Table
        rowKey="id"
        loading={loading || actionLoading}
        columns={columns}
        dataSource={list}
        rowClassName={(record) => record.is_delete ? 'deleted-row' : ''}
        pagination={{
          current: page,
          pageSize,
          total,
          showSizeChanger: true,
          onChange: (p, ps) => {
            setPage(p);
            setPageSize(ps);
            fetchList(p, ps, keyword);
          }
        }}
      />

      <Modal
        open={open}
        title={editing ? '编辑文章' : '新建文章'}
        onCancel={() => setOpen(false)}
        onOk={handleSubmit}
        destroyOnClose
        okText="保存"
        cancelText="取消"
      >
        <Form form={form} layout="vertical" preserve={false}>
          <Form.Item name="title" label="标题" rules={[{ required: true, message: '请输入标题' }]}>
            <Input placeholder="文章标题" />
          </Form.Item>
          <Form.Item name="desc" label="摘要">
            <Input.TextArea rows={3} placeholder="文章摘要" />
          </Form.Item>
          <Form.Item name="content" label="内容" rules={[{ required: true, message: '请输入内容' }]}>
            <Input.TextArea rows={8} placeholder="支持 Markdown 文本" />
          </Form.Item>
          <Form.Item name="tags" label="标签(逗号分隔)">
            <Input placeholder="如: Go,后端,数据库" />
          </Form.Item>
        </Form>
      </Modal>
    </Card>
  );
};

export default Z_AdminArticles;