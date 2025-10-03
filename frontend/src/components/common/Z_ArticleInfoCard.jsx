import { useState } from 'react';
import { Empty, Card, Row, Col, Tag, Typography } from 'antd';
import { useNavigate } from 'react-router-dom';

const { Title, Paragraph, Text } = Typography;

const Z_ArticleInfoCard = ({ item }) => {
  const navigate = useNavigate();
  const [hovered, setHovered] = useState(false);  // 用来控制是否悬停

  return (
    // <Col xl={12} md={24} xs={24} key={item.id}>
      <Card
        hoverable
        onClick={() => navigate(`/article/${item.id}`)}
        style={{
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
          transition: 'transform 0.5s ease, box-shadow 0.5s ease',
          transform: hovered ? 'scale(1.02)' : 'scale(1)', 
        }}
        onMouseEnter={() => setHovered(true)} 
        onMouseLeave={() => setHovered(false)}
        cover={
          item.cover ? (
            <img
              src={item.cover}
              alt={item.title}
              style={{ height: '200px', objectFit: 'cover' }}
            />
          ) : (
            <div style={{ height: '200px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f0f0f0' }}>
              <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="暂无封面" />
            </div>
          )
        }
      >
        <Title level={4} style={{ margin: 0 }}>
          {item.title}
        </Title>
        <Paragraph ellipsis={{ rows: 2 }} style={{ margin: '8px 0' }}>
          {item.desc}
        </Paragraph>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div>
            {item.tags && item.tags.trim() !== "" ? (
              item.tags
                .replace(/^\[|\]$/g, '')
                .split(",")                   // 按逗号切分
                .map(tag => tag.trim())       // 去掉前后空格
                .filter(tag => tag.length > 0) // 过滤掉空字符串
                .map((tag, idx) => (
                  <Tag key={idx} color="blue">
                    {tag}
                  </Tag>
                ))
            ) : (
              <Text type="secondary">暂无标签</Text>
            )}
          </div>
          <Text type="secondary">{`${item.authorName} | ${new Date(item.createdAt).toLocaleDateString()}`} | {`${item.views}`}</Text>
        </div>
      </Card>
    // </Col>
  );
};

export default Z_ArticleInfoCard;
