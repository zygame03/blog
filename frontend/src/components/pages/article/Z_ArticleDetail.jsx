import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Layout, Row, Col, Spin, Affix } from 'antd';
import axios from 'axios';
import { motion } from 'framer-motion';

import Z_Header from '../../layout/Z_Header';
import Z_ArticleContent from './components/Z_ArticleContent';
import Z_ArticleIndex from './components/Z_ArticleIndex';
import Z_Content from '../../layout/Z_Content';
import Z_Footer from '../../layout/Z_Footer';

import { API_BASE } from '../../../api';

const { Header, Content, Footer } = Layout;

const Z_ArticleDetail = () => {
  const { id } = useParams();
  const [article, setArticle] = useState({});

  useEffect(() => {
    axios.get(`${API_BASE}/api/article/${id}`)
      .then((res) => {
        setArticle(res.data.data);
      })
      .catch((err) => {
        console.error("获取 Article 失败", err);
      });
  }, [id]);

  return (
    <>
      <Layout>
        <Z_Header />

        <Z_Content>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <Row gutter={[16, 16]}>
              {/* 左侧目录：用 Affix 固定 */}
              <Col lg={6} md={0} xs={0}>
                <Affix offsetTop={80}>
                  <Z_ArticleIndex content={article.content} />
                </Affix>
              </Col>

              {/* 右侧正文 */}
              <Col lg={18} md={24} xs={24}>
                <Z_ArticleContent article={article} />
              </Col>
            </Row>
          </motion.div>
        </Z_Content>

        <Z_Footer />
      </Layout>
    </>
  );
};

export default Z_ArticleDetail;
