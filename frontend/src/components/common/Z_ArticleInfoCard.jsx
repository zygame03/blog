import { useState } from "react";
import { Empty, Card, Row, Col, Tag, Typography } from "antd";
import { useNavigate } from "react-router-dom";

const { Paragraph, Text } = Typography;

const Z_ArticleInfoCard = ({ item }) => {
  const navigate = useNavigate();
  const [hovered, setHovered] = useState(false);

  const createdTime = item.createdAt ?? item.created_at;
  const updatedTime = item.updatedAt ?? item.updated_at;

  return (
    <Card
      hoverable
      onClick={() => navigate(`/article/${item.id}`)}
      style={{
        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.15)",
        transition: "transform 0.3s ease, box-shadow 0.3s ease",
        transform: hovered ? "scale(1.02)" : "scale(1)",
        width: "100%",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      title={item.title}
    >
      <Row gutter={16} align="top">
        <Col flex="1 1 0" style={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
          <div>
            <Paragraph ellipsis={{ rows: 3 }} style={{ marginBottom: 8 }}>
              {item.desc}
            </Paragraph>
            <Text type="secondary" style={{ display: "block", marginBottom: 8 }}>
              发布于：{createdTime ? new Date(createdTime).toLocaleDateString() : "--"}  
              &nbsp;&nbsp;更新于：{updatedTime ? new Date(updatedTime).toLocaleDateString() : "--"}
            </Text>
          </div>

          {/* 标签和浏览量，下对齐 */}
          <div 
            style={{ 
              display: "flex", 
              justifyContent: "space-between", 
              alignItems: "flex-end" 
            }}
          >
            <div>
              {item.tags && item.tags.trim() !== "" ? (
                item.tags
                  .replace(/^\[|\]$/g, "")
                  .split(",")
                  .map((tag) => tag.trim())
                  .filter((tag) => tag.length > 0)
                  .map((tag, idx) => (
                    <Tag key={idx} color="blue">
                      {tag}
                    </Tag>
                  ))
              ) : (
                <Text type="secondary">暂无标签</Text>
              )}
            </div>
            <Text type="secondary">{item.views}</Text>
          </div>
        </Col>

        {/* 右侧图片 */}
        <Col flex="200px">
          {item.cover ? (
            <img
              src={item.cover}
              alt={item.title}
              style={{
                width: "100%",
                height: "150px",
                objectFit: "cover",
                borderRadius: 4,
              }}
            />
          ) : (
            <div
              style={{
                width: "100%",
                height: "150px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: "#f0f0f0",
                borderRadius: 4,
              }}
            >
              <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="暂无封面" />
            </div>
          )}
        </Col>
      </Row>
    </Card>
  );
};

export default Z_ArticleInfoCard;
