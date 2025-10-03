import Z_Header from '../../layout/Z_Header';

import { Typography, Layout, Row, Col } from 'antd';

const { Title } = Typography;

const { Header, Content, Footer } = Layout;

const Z_Links = () => {
  return (
    <div>
      <Layout>
        <Z_Header />

        <Content
          style={{
            padding: '0 10%',
            marginTop: 64,
            textAlign: 'center',
          }}
        >
          <Title level={4}>施工中...</Title>
        </Content>
        
        <Footer
          style={{
            textAlign: 'center',
          }}
        >
          Ant Design ©{new Date().getFullYear()} Created by Ant UED
        </Footer>
      </Layout>
    </div>
  );
};

export default Z_Links;
