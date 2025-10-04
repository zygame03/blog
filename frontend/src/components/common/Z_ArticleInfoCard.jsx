import { useState } from "react";
import { Empty, Card, Typography, Divider, Tag, Space } from "antd";
import { useNavigate } from "react-router-dom";
import {
  UserOutlined,
  CalendarOutlined,
  EyeOutlined,
  TagsOutlined,
} from "@ant-design/icons";

const { Paragraph, Title, Text } = Typography;

const Z_ArticleInfoCard = ({ item }) => {
  const navigate = useNavigate();
  const [hovered, setHovered] = useState(false);

  const createdTime = item.createdAt ?? item.created_at;

  return (
    <Card
      hoverable
      onClick={() => navigate(`/article/${item.id}`)}
      style={{
        boxShadow: hovered
          ? "0 4px 16px rgba(0,0,0,0.2)"
          : "0 2px 8px rgba(0, 0, 0, 0.15)",
        transition: "all 0.3s ease",
        transform: hovered ? "translateY(-2px)" : "none",
        width: "100%",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* 封面 */}
      {item.cover ? (
        <img
          src={item.cover}
          alt={item.title}
          style={{
            width: "100%",
            height: 180,
            objectFit: "cover",
            borderRadius: 6,
            marginBottom: 12,
          }}
        />
      ) : (
        <div
          style={{
            width: "100%",
            height: 180,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "#f0f0f0",
            borderRadius: 6,
            marginBottom: 12,
          }}
        >
          <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="暂无封面" />
        </div>
      )}

      {/* 标题 */}
      <Title
        level={4}
        style={{ marginBottom: 8, color: hovered ? "#1677ff" : "inherit" }}
      >
        {item.title}
      </Title>

      {/* 简介 */}
      <Paragraph ellipsis={{ rows: 3 }} style={{ marginBottom: 12 }}>
        {item.desc || "暂无简介"}
      </Paragraph>

      <Divider style={{ margin: "12px 0" }} />

      {/* 作者、时间、浏览数、标签 */}
      <Space size={[16, 8]} wrap style={{ fontSize: 14 }}>
        <Text type="secondary">
          <UserOutlined /> {item.author ?? "未知作者"}
        </Text>
        <Text type="secondary">
          <CalendarOutlined />{" "}
          {createdTime
            ? new Date(createdTime).toLocaleDateString()
            : "--"}
        </Text>
        <Text type="secondary">
          <EyeOutlined /> {item.views ?? 0}
        </Text>
        <Text type="secondary">
          <TagsOutlined />{" "}
          {item.tags && item.tags.trim() !== "" ? (
            item.tags
              .replace(/^\[|\]$/g, "")
              .split(",")
              .map((tag) => tag.trim())
              .filter((tag) => tag.length > 0)
              .map((tag, idx) => (
                <Tag key={idx} color="blue" style={{ marginInlineEnd: 4 }}>
                  {tag}
                </Tag>
              ))
          ) : (
            "暂无标签"
          )}
        </Text>
      </Space>
    </Card>
  );
};

export default Z_ArticleInfoCard;
