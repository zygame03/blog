// src/pages/Z_ArticleDetail.jsx
import { useParams } from 'react-router-dom';
import { Layout, Row, Col, Spin, message } from 'antd';
import { motion } from 'framer-motion';

import Z_Header from '../components/layout/Z_Header';
import Z_ArticleContent from '../components/pages/article/Z_ArticleContent';
import Z_ArticleIndex from '../components/pages/article/Z_ArticleIndex';
import Z_Content from '../components/layout/Z_Content';
import Z_Footer from '../components/layout/Z_Footer';
import { useArticleDetail } from '../hooks/useArticleDetail';

const Z_ArticleDetail = () => {
  const { id } = useParams();
  const { article, loading, error } = useArticleDetail(id);

  if (error) {
    message.error('文章加载失败');
  }

  if (loading) {
    return (
      <Layout>
        <Z_Header />
        <Z_Content>
          <div style={{ textAlign: 'center', padding: '50px' }}>
            <Spin size="large" />
          </div>
        </Z_Content>
        <Z_Footer />
      </Layout>
    );
  }

  return (
    <Layout>
      <Z_Header />
      <Z_Content>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <Row gutter={[16, 16]}>
            <Col lg={6} md={0} xs={0}>
              <Z_ArticleIndex content={article.content} />
            </Col>
            <Col lg={18} md={24} xs={24}>
              <Z_ArticleContent article={article} />
            </Col>
          </Row>
        </motion.div>
      </Z_Content>
      <Z_Footer />
    </Layout>
  );
};

export default Z_ArticleDetail;