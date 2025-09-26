import React from 'react';
import Z_Header from '../layout/Z_Header';
import Z_Background from '../common/Z_Background';
import Z_Profile from '../common/Z_Profile';
import Z_HotArticles from '../common/Z_HotArticles';

import { Layout, theme, Row, Col} from 'antd';

// 引入样式表
import './Z_Home.css';

const { Header, Content, Footer } = Layout;

const items = Array.from({ length: 3 }).map((_, index) => ({
  key: String(index + 1),
  label: `nav ${index + 1}`,
}));

const Z_AboutMe = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <div className="app-container">
      <Layout>
        <Header className="app-header">
          <Z_Header />
        </Header>

        <Content className="app-content">
        </Content>

        <Footer className="app-footer">
          Ant Design ©{new Date().getFullYear()} Created by Ant UED
        </Footer>
      </Layout>
    </div>
  );
};

export default Z_AboutMe;
