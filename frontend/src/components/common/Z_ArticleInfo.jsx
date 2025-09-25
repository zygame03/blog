import React from 'react';
import { Avatar, Typography, Tag } from 'antd';
import { useEffect, useState } from 'react';
import './Z_ArticleInfo.css';

const { Title, Text } = Typography;

const Z_ArticleInfo = ({ article }) => {
  const [height, setHeight] = useState(40); // vh
  const [opacity, setOpacity] = useState(1);
  const { title, authorName, createdAt, cover, tags, desc } = article;

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
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      className="z-background"
      style={{ height: `${height}vh`, opacity: opacity }}
    >
      {/* 背景层 */}
      <div
        className="z-bg-image"
        style={{ backgroundImage: `url(${cover})` }} // 确保 `cover` 是图片路径
      />

      {/* 文字层 */}
      <div className="z-bg-text">
        <Title level={1}>{title}</Title>
        <Text type="secondary">{`By ${authorName} | ${new Date(createdAt).toLocaleDateString()}`}</Text>
        <div>
          {tags?.map((tag, index) => (
            <Tag key={index} color="geekblue">
              {tag}
            </Tag>
          ))}
        </div>
        {desc && (
          <div className="z-description">
            <Text>{desc}</Text>
          </div>
        )}
      </div>
    </div>
  );
};

export default Z_ArticleInfo;
