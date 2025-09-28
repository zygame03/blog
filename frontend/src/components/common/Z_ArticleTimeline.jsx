import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Timeline, Typography, Tag } from 'antd';
import { useNavigate } from 'react-router-dom';

import { API_BASE } from '../../api';

const { Title, Text } = Typography;

const Z_ArticleTimeline = () => {
  const [hotArticles, getArticles] = useState([])
  
  useEffect(() => {
    axios.get(`${API_BASE}/api/article/articlesTimeline`)
      .then((res) => {
        getArticles(res.data); // axios 已经解析好了 JSON
      })
      .catch((err) => {
        console.error("获取 hotArticles 失败", err);
      });
  }, []);

  const navigate = useNavigate();

  const handleClick = (id) => {
    navigate(`/article/${id}`);
  };

  return (
    <div style={{ padding: '20px' }}>
      <Timeline mode="left">
        {hotArticles.map((article) => (
          <Timeline.Item
            key={article.id}
            onClick={() => handleClick(article.id)}
            style={{ cursor: 'pointer' }}
          >
            <Title level={5}>{article.title}</Title>
            <div>
              <Text type="secondary">{`By ${article.authorName} | ${new Date(article.createdAt).toLocaleDateString()}`}</Text>
            </div>
            <div>
              {article.tags && article.tags.length > 0 ? (
                article.tags.map((tag, idx) => (
                  <Tag key={idx} color="blue">
                    {tag}
                  </Tag>
                ))
              ) : (
                <Text type="secondary">暂无标签</Text>
              )}
            </div>
            <div style={{ marginTop: 8 }}>
              <Text ellipsis={{ rows: 2 }} style={{ maxWidth: '300px' }}>
                {article.desc}
              </Text>
            </div>
          </Timeline.Item>
        ))}
      </Timeline>
    </div>
  );
};

export default Z_ArticleTimeline;
