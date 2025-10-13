// Z_ArticlePagination.jsx
import React, { useState, useEffect, useMemo } from "react";
import { Row, Col, Pagination, Spin, Card, Empty, Typography, Divider, message } from "antd";
import axios from "axios";
import Z_ArticleInfoCard from "../../../common/Z_ArticleInfoCard";
import { API_BASE } from "../../../../api";

const { Title } = Typography;
const PAGE_SIZE = 10;

const Z_ArticlePagination = () => {
  const [articles, setArticles] = useState([]);
  const [total, setTotal] = useState(0);
  const [current, setCurrent] = useState(1);
  const [loading, setLoading] = useState(false);

  const fetchArticles = async (page = 1) => {
    setLoading(true);
    try {
      const res = await axios.get(`${API_BASE}/api/article`, {
        params: { page, pageSize: PAGE_SIZE },
      });

      const body = res.data.data;
      let list = [];
      let totalCount = 0;

      if (Array.isArray(body)) {
        list = body;
        totalCount = body.length;
      } else {
        list = body.list ?? body.data ?? body.items ?? [];
        totalCount =
          body.total ??
          body.count ??
          body.totalCount ??
          (Array.isArray(list) ? list.length : 0);
      }

      setArticles(list);
      setTotal(totalCount);
    } catch (err) {
      console.error("fetchArticles error:", err);
      message.error("文章加载失败");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArticles(1);
  }, []);

  // 按年份分组
  const grouped = useMemo(() => {
    return articles.reduce((acc, item) => {
      const time = item.created_at ?? item.createdAt ?? item.updated_at ?? item.updatedAt;
      const year = time ? new Date(time).getFullYear() : "未知";
      if (!acc[year]) acc[year] = [];
      acc[year].push(item);
      return acc;
    }, {});
  }, [articles]);

  const years = useMemo(() => Object.keys(grouped).sort((a, b) => b - a), [grouped]);

  const handlePageChange = (page) => {
    setCurrent(page);
    fetchArticles(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      {loading ? (
        <div style={{ textAlign: "center"}}>
          <Spin size="large" />
        </div>
      ) : years.length === 0 ? (
        <Empty description="暂无文章" />
      ) : (
        years.map((year) => (
          <div 
            key={year} 
            style={{ 
              marginBottom: 32 
            }}
          >
            <Divider orientation="left">
              <Title level={3} style={{ margin: 0 }}>
                {year}
              </Title>
            </Divider>
            <Row 
              gutter={[24, 24]}
            >
              {grouped[year].map((item) => (
                <Col xl={24} md={24} xs={24} key={item.id}>
                  <Z_ArticleInfoCard key={item.id} item={item} />
                </Col>
              ))}
            </Row>
          </div>
        ))
      )}

      <div style={{ marginTop: 24, textAlign: "center" }}>
        <Pagination
          current={current}
          pageSize={PAGE_SIZE}
          total={total}
          onChange={handlePageChange}
        />
      </div>
    </>
  );
};

export default Z_ArticlePagination;
