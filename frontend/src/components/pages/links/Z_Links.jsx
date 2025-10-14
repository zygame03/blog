import Z_Header from '../../layout/Z_Header';
import Z_Content from '../../layout/Z_Content';
import Z_Footer from '../../layout/Z_Footer';

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
        
        <Z_Footer />
      </Layout>
    </div>
  );
};

export default Z_Links;
