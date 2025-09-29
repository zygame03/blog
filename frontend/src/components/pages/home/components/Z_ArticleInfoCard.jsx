import { useState } from 'react';
import { Empty, Card, Row, Col, Tag, Typography } from 'antd';
import { useNavigate } from 'react-router-dom';

const { Title, Paragraph, Text } = Typography;

const Z_ArticleInfoCard = ({ item }) => {
  const navigate = useNavigate();
  const [hovered, setHovered] = useState(false);  // 用来控制是否悬停

  return (
    <Col span={12} key={item.id}>
      <Card
        hoverable
        onClick={() => navigate(`/article/${item.id}`)}
        style={{
          marginBottom: 0,
          padding: 0,
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
            {/* 处理 tags 为空的情况 */}
            {item.tags && item.tags.length > 0 ? (
              item.tags.map((tag, idx) => (
                <Tag key={idx} color="blue">
                  {tag}
                </Tag>
              ))
            ) : (
              <Text type="secondary">暂无标签</Text>
            )}
          </div>
          <Text type="secondary">{`${item.authorName} | ${new Date(item.createdAt).toLocaleDateString()}`}</Text>
        </div>
      </Card>
    </Col>
  );
};

export default Z_ArticleInfoCard;
