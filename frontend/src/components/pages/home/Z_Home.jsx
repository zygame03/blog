import Z_Header from '../../layout/Z_Header';
import Z_Background from './components/Z_Background';
import Z_ProfileCard from '../../common/Z_ProfileCard';
import Z_HotArticles from './components/Z_HotArticles';

import { Layout, Row, Col } from 'antd';

const { Header, Content, Footer } = Layout;

const Z_Home = () => {
  return (
    <div>
      <Layout>
        <Z_Header />

        <Content
          style={{
            padding: '0 5%',
            marginTop: 88,
          }}
        >
            <Row gutter={[24, 24]} align="top">
              {/* <Col xs={24}>
                <Z_Background />
              </Col> */}

              <Col
                xl={6} lg={8} md={24} xs={24}
              >
                <Z_ProfileCard />
              </Col>

              <Col
                xl={18} lg={16} md={24}
              >
                <Z_HotArticles />
              </Col>
            </Row>
        </Content>
      
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
    </div>
  );
};

export default Z_Home;
