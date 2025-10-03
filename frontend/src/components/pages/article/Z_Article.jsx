import React from 'react';
import Z_Header from '../../layout/Z_Header';
import Z_ArticleTimeline from './components/Z_ArticleTimeline';
import Z_ArticlePagination from './components/Z_ArticlePagination';

import { Layout, Row, Col } from 'antd';

const { Header, Content, Footer } = Layout;

const fadeInTime = 'fadeIn 1s ease-out forwards'

const Z_Article = () => {
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
          <Row gutter={24}>
            <Col
              
              style={{
                animation: fadeInTime,
              }}
            >
              <Z_ArticlePagination />
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
