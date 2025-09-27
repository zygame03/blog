import React from 'react';
import Z_Header from '../layout/Z_Header';
import Z_ArticleTimeline from '../common/Z_ArticleTimeLine';

import { Layout, Row, Col } from 'antd';

const { Header, Content, Footer } = Layout;

const fadeInTime = 'fadeIn 1s ease-out forwards'

const Z_Article = () => {
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
          <Row gutter={16}>
            <Col
              span={6}
              style={{
                animation: fadeInTime,
              }}
            >
            </Col>

            <Col
              span={18}
              style={{
                animation: fadeInTime,
              }}
            >
              <Z_ArticleTimeline />
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

export default Z_Article;
