import React from "react";
import { Card, Typography } from "antd";

const { Title, Paragraph } = Typography;

const Z_AboutSite = ({ siteInfo }) => {
  const info = siteInfo || {
    text:
      "这是一个使用 React + Ant Design 构建的个人博客网站，用于展示文章、学习笔记以及个人项目。",
    author: "zygame",
    year: new Date().getFullYear(),
  };

  return (
    <Card
      title='关于本站'
    >
      <Paragraph>{info.text}</Paragraph>
      <Paragraph type="secondary">
        {info.author} | © {info.year}
      </Paragraph>
    </Card>
  );
};

export default Z_AboutSite;
