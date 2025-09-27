import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Layout, Row, Col, Spin } from 'antd';
import axios from 'axios';

import Z_Header from '../layout/Z_Header';
import Z_ArticleContent from '../common/Z_ArticleContent';
import Z_ArticleIndex from '../common/Z_ArticleIndex';
import Z_ArticleInfo from '../common/Z_ArticleInfo';

import { API_BASE } from '../../api';

const { Header, Content, Footer } = Layout;

const Z_ArticleDetail = () => {
  const { id } = useParams();
  const [article, setArticle] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let timer;
    const minLoadingTime = 600; // 最小加载时间 600ms
    const startTime = Date.now();

    axios.get(`${API_BASE}/api/article/${id}`)
      .then((res) => {
        setArticle(res.data);
        const elapsed = Date.now() - startTime;
        const delay = Math.max(minLoadingTime - elapsed, 0);
        timer = setTimeout(() => setLoading(false), delay);
      })
      .catch((err) => {
        console.error("获取 Article 失败", err);
        const elapsed = Date.now() - startTime;
        const delay = Math.max(minLoadingTime - elapsed, 0);
        timer = setTimeout(() => setLoading(false), delay);
      });

    return () => clearTimeout(timer);
  }, [id]);

  return (
    <Layout>
      <Z_Header />
      
      {/* Content */}
      <Content style={{ 
        padding: '0 10%', 
        minHeight: 'calc(100vh - 128px)', 
        position: 'relative' }}>
        {loading ? (
          <div style={{ textAlign: 'center', padding: '100px 0' }}>
            <Spin size="large" tip="加载中..." />
          </div>
        ) : (
          <>
            <Row gutter={[16, 16]} style={{ marginBottom: 20 }}>
              <Col span={24}>
                <div
                  style={{
                    margin: '0 -13%', // 抵消 Content 的左右 padding
                    textAlign: 'center',
                  }}
                >
                  <Z_ArticleInfo article={article} />
                </div>
              </Col>
            </Row>

            <Row gutter={16}>
              <Col span={6}>
                <div>
                  <Z_ArticleIndex content={article.content} />
                </div>
              </Col>

              <Col span={18}>
                <div>
                  <Z_ArticleContent content={article.content} />
                </div>
              </Col>
            </Row>
          </>
        )}
      </Content>

      {/* Footer */}
      <Footer style={{ textAlign: 'center', backgroundColor: '#f0f2f5', padding: '10px 50px' }}>
        Ant Design ©{new Date().getFullYear()} Created by Ant UED
      </Footer>
    </Layout>
  );
};

export default Z_ArticleDetail;
