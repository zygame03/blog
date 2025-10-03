import { useEffect, useState } from 'react';
import { Typography, Tag } from 'antd';
import { FastAverageColor } from 'fast-average-color';

const { Title, Text } = Typography;
const SCROLL_DISTANCE = 1000;

const Z_ArticleInfo = ({ article }) => {
  const [height, setHeight] = useState(50); 
  const [opacity, setOpacity] = useState(1);
  const [bgColor, setBgColor] = useState('rgba(86, 86, 86, 1)'); // 默认背景色
  const { title, authorName, createdAt, cover, tags, desc } = article;

  // 滚动收缩
  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrollY = window.scrollY;
          const newHeight = Math.max(0, 50 - (scrollY / SCROLL_DISTANCE) * 50);
          setHeight(newHeight);
          setOpacity(newHeight / 50);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 提取代表色
  useEffect(() => {
    if (cover) {
      const fac = new FastAverageColor();
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.src = cover;

      img.onload = () => {
        const color = fac.getColor(img);
        setBgColor(color.hex);
      };

      img.onerror = () => {
        console.warn('图片加载失败，使用默认背景色');
      };
    }
  }, [cover]);

  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        height: `${height}vh`,
        opacity,
        overflow: 'hidden',
        backgroundColor: bgColor,
        transition: 'height 0.3s ease, opacity 0.3s ease, background-color 0.5s ease',
      }}
    >
      {/* 内容文字 */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          color: 'white',
          textAlign: 'center',
        }}
      >
        <Title level={1} style={{ margin: 0 }}>{title}</Title>
        <Text type="secondary">
          {`By ${authorName} | ${new Date(createdAt).toLocaleDateString()}`}
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
      </div>
    </div>
  );
};

export default Z_ArticleInfo;
