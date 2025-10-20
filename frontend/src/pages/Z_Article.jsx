// src/pages/Z_Article.jsx
import Z_Header from '../components/layout/Z_Header';
import Z_ArticlePagination from '../components/pages/article/Z_ArticlePagination';
import Z_Content from '../components/layout/Z_Content';
import Z_Footer from '../components/layout/Z_Footer';
import { Layout, Row, Col } from 'antd';
import { fadeInAnimation } from '../style/animations';

const Z_Article = () => {
  return (
    <Layout>
      <Z_Header />
      <Z_Content>
        <Row gutter={24}>
          <Col style={{ animation: fadeInAnimation }}>
            <Z_ArticlePagination />
          </Col>
        </Row>
      </Z_Content>
      <Z_Footer />
    </Layout>
  );
};

export default Z_Article;