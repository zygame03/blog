import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Layout, Row, Col} from 'antd';
import axios from 'axios';

// 引入样式表
import './Z_ArticleDetail.css';
import Z_Header from '../layout/Z_Header';
import Z_ArticleContent from '../common/Z_ArticleContent';
import Z_ArticleIndex from '../common/Z_ArticleIndex';
import Z_ArticleInfo from '../common/Z_ArticleInfo';

import { API_BASE } from '../../api';

const { Header, Content, Footer } = Layout;

const Z_Article = () => {
  const { id } = useParams();
  const [article, setArticle] = useState({});
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    // 通过 ID 获取文章详情
    axios.get(`${API_BASE}/api/article/${id}`)
      .then((res) => {
        setArticle(res.data);
        setLoading(false);  // 加载完成
      })
      .catch((err) => {
        console.error("获取 Article 失败", err);
        setLoading(false);  // 加载完成，即使出错
      });
  }, [id]);

  if (loading) {
    return <div>Loading...</div>; // 加载中提示
  }

  return (
    <div className="article-container">
      <Layout>
        <Header className="article-header">
          <Z_Header />
        </Header>

        <Content className="article-content">
          <Z_ArticleInfo article={article} className="article-background"/>
          <Row gutter={16} className="article-row">
            <Col span={6} className="article-profile">
              <Z_ArticleIndex content={article.content} />
            </Col>
            <Col span={18} className="article-outlet"> 
              <Z_ArticleContent content={article.content} />
            </Col>
          </Row>
        </Content>

        <Footer className="article-footer">
          Ant Design ©{new Date().getFullYear()} Created by Ant UED
        </Footer>
      </Layout>
    </div>
  );
};

export default Z_Article;
