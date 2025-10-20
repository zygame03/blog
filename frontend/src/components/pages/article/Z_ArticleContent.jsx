import { useEffect } from "react";
import { Card, Typography, Tag } from "antd";
import { Markdown } from "@ant-design/pro-editor";

const { Title, Text } = Typography;

import { useAppTheme } from "../../../contexts/ThemeContext";

const Z_ArticleContent = ({ article }) => {
  const { title, authorName, createdAt, content, tags, desc } = article;
  const { themeMode } = useAppTheme();

  useEffect(() => {
    // 扫描 Markdown 渲染结果中的 h1-h6
    const container = document.querySelector("#article-content");
    if (container) {
      let i = 0;
      container.querySelectorAll("h1,h2,h3,h4,h5,h6").forEach((el) => {
        el.id = `heading-${i++}`; // 和 Z_ArticleIndex 保持一致
      });
    }
  }, [content]);

  return (
    <Card>
      <Title level={3} style={{ margin: 0 }}>
        {title}
      </Title>
      <Text type="secondary">
        {`${authorName} | ${new Date(createdAt).toLocaleDateString()}`}
      </Text>

      <div>
        {tags && tags.trim() !== "" ? (
          tags
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

      {desc && (
        <div style={{ marginTop: 8, fontSize: 20 }}>
          <Text>{desc}</Text>
        </div>
      )}

      <div>
        <Markdown>{content}</Markdown>
      </div>
    </Card>
  );
};

export default Z_ArticleContent;
