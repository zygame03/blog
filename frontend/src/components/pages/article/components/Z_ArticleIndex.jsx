import { useEffect, useState } from "react";
import { Card, Anchor } from "antd";

const { Link } = Anchor;

const Z_ArticleIndex = ({ content }) => {
  const [toc, setToc] = useState([]);

  useEffect(() => {
    // 正则匹配 Markdown 中的标题
    const headingRegex = /^(#{1,6})\s+(.+)$/gm;
    const matches = [];

    let match;
    while ((match = headingRegex.exec(content)) !== null) {
      const level = match[1].length; // 标题级别
      const title = match[2].trim(); // 标题内容
      const id = `heading-${matches.length}`; // 生成唯一 id

      matches.push({ level, title, id });
    }

    setToc(matches);

    // 给文章内容里的对应标题加 id（假设正文在 #article-content 里）
    const container = document.querySelector("#article-content");
    if (container) {
      let i = 0;
      container.querySelectorAll("h1,h2,h3,h4,h5,h6").forEach((el) => {
        el.id = `heading-${i++}`;
      });
    }
  }, [content]);

  // 递归渲染目录项（支持层级缩进）
  const renderLinks = (items) =>
    items.map((item) => (
      <Link
        key={item.id}
        href={`#${item.id}`}
        title={item.title}
      />
    ));

  return (
    <Card
      title="目录"
    >
      <Anchor
        affix={false} // 不固定在顶部
        offsetTop={80} // 页面滚动时的偏移量（避免被header挡住）
      >
        {renderLinks(toc)}
      </Anchor>
    </Card>
  );
};

export default Z_ArticleIndex;
