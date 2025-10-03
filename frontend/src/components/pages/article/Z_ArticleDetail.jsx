import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Layout, Row, Col, Spin } from 'antd';
import axios from 'axios';
import { motion } from 'framer-motion'; // 新增

import Z_Header from '../../layout/Z_Header';
import Z_ArticleContent from './components/Z_ArticleContent';
import Z_ArticleIndex from './components/Z_ArticleIndex';
import Z_Content from '../../layout/Z_Content';

import { API_BASE } from '../../../api';

const { Header, Content, Footer } = Layout;

const Z_ArticleDetail = () => {
  const { id } = useParams();
  const [article, setArticle] = useState({});

  useEffect(() => {
    axios.get(`${API_BASE}/api/article/${id}`)
      .then((res) => {
        setArticle(res.data);
      })
      .catch((err) => {
        console.error("获取 Article 失败", err);
      });
  
  }, [id]);

  return (
    <Layout>
      <Z_Header />

      <Z_Content>
        <motion.div
          initial={{ opacity: 0, y: 50 }} // 初始状态：下方 & 透明
          animate={{ opacity: 1, y: 0 }}  // 动画结束：正常位置 & 不透明
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <Row gutter={[24, 24]}>
            <Col lg={6} md={0} xs={0}>
              <Z_ArticleIndex content={article.content} />
            </Col>
            <Col lg={18} md={24} xs={24}>
              <Z_ArticleContent article={article} />
            </Col>
          </Row>
        </motion.div>
      </Z_Content>

      <Footer 
        style={{ 
          textAlign: 'center', 
          }}
        >
        Ant Design ©{new Date().getFullYear()} Created by Ant UED
      </Footer>
    </Layout>
  );
};

export default Z_ArticleDetail;
