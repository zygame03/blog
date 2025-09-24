import { useEffect, useState } from 'react';
import remarkToc from 'remark-toc';

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
    <div>
      <h2>目录</h2>
      <ul>
        {toc.map((item, index) => (
          <li key={index} style={{ marginLeft: `${item.level * 10}px` }}>
           {item.title}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Z_ArticleIndex;
