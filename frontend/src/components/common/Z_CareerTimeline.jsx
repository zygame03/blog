import React, { useRef, useEffect, useState } from 'react';
import { Card, Typography } from 'antd';
import { UserOutlined, BookOutlined, LaptopOutlined, StarOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

const iconMap = {
  education: <BookOutlined style={{ fontSize: 24 }} />,
  work: <LaptopOutlined style={{ fontSize: 24 }} />,
  other: <StarOutlined style={{ fontSize: 24 }} />,
};

const Z_CareerTimeline = ({ careerList = [] }) => {
  const containerRef = useRef(null);
  const [visibleIndexes, setVisibleIndexes] = useState([]);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const children = Array.from(containerRef.current.children);
      const newVisible = children.map((child, idx) => {
        const rect = child.getBoundingClientRect();
        return rect.left < window.innerWidth && rect.right > 0;
      });
      setVisibleIndexes(newVisible.map((v, i) => (v ? i : null)).filter(v => v !== null));
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // 初次计算
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <Card
      title= '生涯时间线'
      style={{
        boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
      }}
    >
      <div>
        {careerList.length > 0
          ? careerList.map((item, idx) => {
              const isVisible = visibleIndexes.includes(idx);
              return (
                <div
                  key={idx}
                  style={{
                    display: 'inline-flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    minWidth: 150,
                    transition: 'opacity 0.8s ease, transform 0.8s ease',
                    opacity: isVisible ? 1 : 0,
                    transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
                  }}
                >
                  <div>{iconMap[item.type] || <UserOutlined style={{ fontSize: 24 }} />}</div>
                  <Text strong style={{ marginTop: 8 }}>{item.year}</Text>
                  <div>{item.event}</div>
                  {item.description && (
                    <Text type="secondary" style={{ fontSize: 12 }}>{item.description}</Text>
                  )}
                </div>
              );
            })
          : (
            <div style={{ display: 'inline-flex', flexDirection: 'column', alignItems: 'center' }}>
              暂无经历
            </div>
          )}
      </div>
    </Card>
  );
};

export default Z_CareerTimeline;
