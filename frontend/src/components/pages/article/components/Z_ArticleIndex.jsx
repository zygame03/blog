import { useEffect, useState } from 'react';
import { Card } from 'antd';

const Z_ArticleIndex = ({ content }) => {
  const [toc, setToc] = useState([]);

  useEffect(() => {
    // 正则匹配 Markdown 中的标题
    const headingRegex = /^(#{1,6})\s+(.+)$/gm;
    const matches = [];
    
    let match;
    while ((match = headingRegex.exec(content)) !== null) {
      const level = match[1].length;  // 标题的等级，如 # 为 1，## 为 2
      const title = match[2];  // 标题内容
      matches.push({ level, title });
    }

    setToc(matches);
  }, [content]);

  return (
    <Card 
      style={{
          marginBottom: 0, // 减小卡片之间的间距
          padding: 0, // 减小卡片的内边距
          borderRadius: 8, // 边角圆滑
          boxShadow: '0 2px 8px rgba(0,0,0,0.15)' // 添加适度阴影提升卡片视觉层次
        }}
      >
      <h2>目录</h2>
      <ul>
        {toc.map((item, index) => (
          <li key={index} style={{ marginLeft: `${item.level * 10}px` }}>
           {item.title}
          </li>
        ))}
      </ul>
    </Card>
  );
};

export default Z_ArticleIndex;
