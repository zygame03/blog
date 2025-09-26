import { Card } from 'antd';
import { Markdown } from '@ant-design/pro-editor';


const Z_ArticleContent = ({ content }) => {
  return (
    <Card 
      style={{
          marginBottom: 0, // 减小卡片之间的间距
          padding: 0, // 减小卡片的内边距
          borderRadius: 8, // 边角圆滑
          boxShadow: '0 2px 8px rgba(0,0,0,0.15)' // 添加适度阴影提升卡片视觉层次
        }}
      >
      <Markdown>{content}</Markdown>
    </Card>
  );
};

export default Z_ArticleContent;
