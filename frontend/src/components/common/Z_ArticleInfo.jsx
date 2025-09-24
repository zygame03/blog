import React from 'react';
import { Avatar, Typography, Tag } from 'antd';
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';

import "./Z_ArticleInfo.css"

const { Title, Text } = Typography;

const Z_ArticleInfo = ({ article }) => {
  const [height, setHeight] = useState(40); // vh
  const [opacity, setOpacity] = useState(1);
  const { title, authorName, createdAt, cover, tags } = article;

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrollY = window.scrollY;
          // 滚动 300px 内高度从 40vh -> 0vh
          const newHeight = Math.max(0, 40 - (scrollY / 300) * 40);
          setHeight(newHeight);
          setOpacity(newHeight / 40);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className="z-background"
      style={{ height: `${height}vh`, opacity: opacity }}
    >
      {/* 背景层 */}
      <div
        className="z-bg-image"
        style={{ backgroundImage: `${article.cover}` }}
      />

      {/* 文字层 */}
      <div className="z-bg-text" style={{ opacity: opacity }}>
        <Title level={1}>{title}</Title>
        <Text>{`By ${authorName} | ${new Date(createdAt).toLocaleDateString()}`}</Text>
        <div style={{ marginTop: '10px' }}>
          {tags?.map((tag, index) => (
            <Tag key={index} color="geekblue">
              {tag}
            </Tag>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Z_ArticleInfo;
