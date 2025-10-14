import Z_Header from '../../layout/Z_Header';
import Z_ProfileCard from '../../common/Z_ProfileCard';
import Z_HotArticles from './components/Z_HotArticles';
import Z_Content from '../../layout/Z_Content';
// import Z_Background from '../../common/Z_Background';
import Z_Background from './components/Z_Background';

import { Layout, Row, Col } from 'antd';

const { Header, Content, Footer } = Layout;

const Z_Home = () => {
  return (
    <>
      <Layout>
        
        <Z_Header />
      
        <Z_Content>
            <Row gutter={[16, 16]} align="top">
              <Col lg={7} md={24} xs={24}>
                <Z_ProfileCard />
              </Col>

              <Col lg={17} md={24} xs={24}>
                <Z_HotArticles />
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
    </>
  );
};

export default Z_Home;
