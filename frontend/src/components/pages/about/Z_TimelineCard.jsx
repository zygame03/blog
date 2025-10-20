// src/components/pages/about/Z_TimelineCard.jsx
import React from 'react';
import { Card, Timeline, Typography, Spin, message } from 'antd';
import { useTimeline } from '../../../hooks/useTimeline';

const { Title } = Typography;

const Z_TimelineCard = () => {
  const { timeline, loading, error } = useTimeline();

  if (error) {
    message.error('时间轴加载失败');
  }

  // 确保 timeline 是数组
  const safeTimeline = Array.isArray(timeline) ? timeline : [];

  return (
    <Card title="时间经历">
      {loading ? (
        <Spin size="small" />
      ) : safeTimeline.length > 0 ? (
        <Timeline
          items={safeTimeline.map(item => ({
            color: 'orange',
            children: (
              <div>
                <strong>{item.year}</strong> — {item.event}
              </div>
            ),
          }))}
        />
      ) : (
        <div>暂无时间轴数据</div>
      )}
    </Card>
  );
};

export default Z_TimelineCard;