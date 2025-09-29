import { useEffect, useState } from "react";
import { Card, Row, Col, Tag, Typography } from "antd";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import Z_ArticleInfoCard from "./Z_ArticleInfoCard";

import { API_BASE } from "../../../../api";

const { Title, Paragraph, Text } = Typography;

const Z_HotArticles = () => {
  const [hotArticles, getArticles] = useState([])
  
  useEffect(() => {
    axios.get(`${API_BASE}/api/article/hotArticles`)
      .then((res) => {
        getArticles(res.data); // axios 已经解析好了 JSON
      })
      .catch((err) => {
        console.error("获取 hotArticles 失败", err);
      });
  }, []);
  
  const navigate = useNavigate();

  return (
    <Card 
      title="热门文章" 
    >
      <Row gutter={[16, 16]}>
        {hotArticles.map((item) => (
          <Z_ArticleInfoCard key={item.id} item={item} /> // 渲染每个卡片
        ))}
      </Row>
    </Card>
  );
};

export default Z_HotArticles;
