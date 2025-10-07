import { useState } from "react";
import { Empty, Card, Typography, Divider, Tag, Space } from "antd";
import { useNavigate } from "react-router-dom";
import {
  UserOutlined,
  CalendarOutlined,
  EyeOutlined,
  TagsOutlined,
} from "@ant-design/icons";

import Z_FancyHoverBox from "./Z_FancyHoverBox"

const { Paragraph, Title, Text } = Typography;

const Z_ArticleInfoCard = ({ item }) => {
  const navigate = useNavigate();
  const [hovered, setHovered] = useState(false);

  const createdTime = item.createdAt ?? item.created_at;

  return (
    <Z_FancyHoverBox>
      <Card
        hoverable
        onClick={() => navigate(`/article/${item.id}`)}
        style={{
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
          style={{ marginBottom: 8, color: hovered ? "#ff4d4f" : "inherit" }}
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
            <UserOutlined /> {item.authorName ?? "未知作者"}
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
                  <Tag key={idx} color="#ff4d50a8" style={{ marginInlineEnd: 4 }}>
                    {tag}
                  </Tag>
                ))
            ) : (
              "暂无标签"
            )}
          </Text>
        </Space>
      </Card>
    </Z_FancyHoverBox>
    
  );
};

export default Z_ArticleInfoCard;
