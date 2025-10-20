import Z_Header from '../components/layout/Z_Header';
import Z_Footer from '../components/layout/Z_Footer';

import { Typography, Layout, Row, Col } from 'antd';

const { Title } = Typography;

const { Header, Content, Footer } = Layout;

const Z_Classic = () => {
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
        
        <Z_Footer />
      </Layout>
    </div>
  );
};

export default Z_Classic;
