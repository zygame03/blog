import Z_Header from '../../layout/Z_Header';
import Z_Background from './components/Z_Background';
import Z_ProfileCard from '../../common/Z_ProfileCard';
import Z_HotArticles from './components/Z_HotArticles';

import { Layout, Row, Col } from 'antd';

const { Header, Content, Footer } = Layout;

const fadeInTime = 'fadeIn 1s ease-out forwards'

const Z_Home = () => {
  return (
    <div
      style={{
        minWidth: '800px', 
      }}
    >
      <Layout>
        <Z_Header />

        <Content
          style={{
            padding: '0 10%',
            marginTop: 64,
          }}
        >
          <Row gutter={16} style={{ marginTop: '12px' }}>
            <Col
              span={6}
              style={{
                animation: fadeInTime,
              }}
            >
              <Z_ProfileCard />
            </Col>

            <Col
              span={18}
              style={{
                animation: fadeInTime,
              }}
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
