import React from 'react';
import { Card, Row, Col, Tag, Typography } from 'antd';
import { useNavigate } from 'react-router-dom';
import './Z_ArticleInfoCard.css'; // 导入外部 CSS 文件

const { Title, Paragraph, Text } = Typography;

const Z_ArticleInfoCard = ({ item }) => {
  const navigate = useNavigate();

  return (
    <Col span={12} key={item.id}>
      <Card
        hoverable
        onClick={() => navigate(`/article/${item.id}`)}
        className="article-info-card" // 使用外部 CSS 类
      >
        <Row gutter={12}>
          {/* 左侧封面图 */}
          <Col flex="100px">
            <img
              src={item.cover || 'avatar_0.jpg'}
              alt={item.title}
              className="card-image"
            />
          </Col>

          {/* 右侧内容 */}
          <Col flex="auto">
            <Title level={5} style={{ margin: 0 }}>
              {item.title}
            </Title>
            <Paragraph ellipsis={{ rows: 2 }} style={{ margin: "4px 0" }}>
              {item.desc}
            </Paragraph>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
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
              <Text type="secondary" style={{ fontSize: 12 }}>
                {item.createdAt} {/* 显示发布时间 */}
              </Text>
            </div>
          </Col>
        </Row>
      </Card>
    </Col>
  );
};

export default Z_ArticleInfoCard;
