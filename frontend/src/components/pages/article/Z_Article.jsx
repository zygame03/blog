import Z_Header from '../../layout/Z_Header';
import Z_ArticlePagination from './components/Z_ArticlePagination';
import Z_Content from '../../layout/Z_Content';

import { Layout, Row, Col } from 'antd';
import Z_Background from '../../common/Z_Background';

const { Header, Content, Footer } = Layout;

const fadeInTime = 'fadeIn 0.8s ease-out forwards'

const Z_Article = () => {
  return (
    <Z_Background>
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
        
        <Footer
          style={{
            textAlign: 'center',
          }}
        >
          Ant Design ©{new Date().getFullYear()} Created by Ant UED
        </Footer>
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
    </Z_Background>
  );
};

export default Z_Article;
