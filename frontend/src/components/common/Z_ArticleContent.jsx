import { Card } from 'antd';
import { Markdown } from '@ant-design/pro-editor';
import { Typography, Tag } from 'antd';

const { Title, Text } = Typography;

const Z_ArticleContent = ({ article }) => {
  const { title, authorName, createdAt, cover, content, tags, desc } = article;

  return (
    <Card 
      style={{
          marginBottom: 0, // 减小卡片之间的间距
          padding: 0, // 减小卡片的内边距
          borderRadius: 8, // 边角圆滑
          boxShadow: '0 2px 8px rgba(0,0,0,0.15)' // 添加适度阴影提升卡片视觉层次
        }}
      >
      <Title level={3} style={{ margin: 0 }}>
        {title}
      </Title>
      <Text type="secondary">
        {`${authorName} | ${new Date(createdAt).toLocaleDateString()}`}
      </Text>
      <div style={{ marginTop: 8 }}>
        {tags?.map((tag, idx) => (
          <Tag key={idx} color="geekblue">{tag}</Tag>
        ))}
      </div>
      {desc && (
        <div style={{ marginTop: 8, fontSize: 20 }}>
          <Text>{desc}</Text>
        </div>
      )}
      <Markdown>{content}</Markdown>
    </Card>
  );
};

export default Z_ArticleContent;
