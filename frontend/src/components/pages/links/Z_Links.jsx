import Z_Header from '../../layout/Z_Header';
import Z_Content from '../../layout/Z_Content';

import { Typography, Layout, Row, Col } from 'antd';

const { Title } = Typography;

const { Header, Content, Footer } = Layout;

const Z_Links = () => {
  return (
    <div>
      <Layout>
        <Z_Header />

        <Z_Content>
          <Title level={4}>施工中...</Title>
        </Z_Content>
        
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
