import React from 'react';
import Z_Header from '../layout/Z_Header';
import Z_Background from '../common/Z_Background';
import Z_Profile from '../common/Z_Profile';
import Z_HotArticles from '../common/Z_HotArticles';

import { Typography, Layout, Row, Col } from 'antd';

const { Title } = Typography;

const { Header, Content, Footer } = Layout;

const Z_Classic = () => {
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

export default Z_Classic;
