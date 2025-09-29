import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Layout, Row, Col, Spin } from 'antd';
import axios from 'axios';
import { motion } from 'framer-motion'; // 新增

import Z_Header from '../../layout/Z_Header';
import Z_ArticleContent from './components/Z_ArticleContent';
import Z_ArticleIndex from './components/Z_ArticleIndex';

import { API_BASE } from '../../../api';

const { Header, Content, Footer } = Layout;

const Z_ArticleDetail = () => {
  const { id } = useParams();
  const [article, setArticle] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let timer;
    const minLoadingTime = 600; // 最小加载时间 600ms
    const startTime = Date.now();

    axios.get(`${API_BASE}/api/article/${id}`)
      .then((res) => {
        setArticle(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("获取 Article 失败", err);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <Spin style={{ margin: '100px auto', display: 'block' }} />;

  return (
    <Layout>
      <Z_Header />

      <Content style={{ 
        marginTop: 80,
        padding: '0 10%', 
        minHeight: 'calc(100vh - 128px)', 
        position: 'relative' 
      }}>
        <motion.div
          initial={{ opacity: 0, y: 50 }} // 初始状态：下方 & 透明
          animate={{ opacity: 1, y: 0 }}  // 动画结束：正常位置 & 不透明
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <Row gutter={16}>
            <Col span={6}>
              <Z_ArticleIndex content={article.content} />
            </Col>
            <Col span={18}>
              <Z_ArticleContent article={article} />
            </Col>
          </Row>
        </motion.div>
      </Content>

      <Footer style={{ textAlign: 'center', backgroundColor: '#f0f2f5', padding: '10px 50px' }}>
        Ant Design ©{new Date().getFullYear()} Created by Ant UED
      </Footer>
    </Layout>
  );
};

export default Z_ArticleDetail;
