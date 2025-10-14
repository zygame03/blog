import Z_Header from '../../layout/Z_Header';
import Z_ArticlePagination from './components/Z_ArticlePagination';
import Z_Content from '../../layout/Z_Content';
import Z_Footer from '../../layout/Z_Footer';

import { Layout, Row, Col } from 'antd';

const { Header, Content, Footer } = Layout;

const fadeInTime = 'fadeIn 0.8s ease-out forwards'

const Z_Article = () => {
  return (
    <>
      <Layout>
        <Z_Header />

        <Z_Content>
          <Row gutter={24}>
            <Col
              style={{
                animation: fadeInTime,
              }}
            >
              <Z_ArticlePagination />
            </Col>
          </Row>

        </Z_Content>
        
        <Z_Footer />
      </Layout>

      <style>
        {`
          @keyframes fadeIn {
            0% {
              opacity: 0;
            }
            100% {
              opacity: 1;
            }
          }
        `}
      </style>
    </>
  );
};

export default Z_Article;
