import React from 'react';
import { Card, Timeline, Typography } from 'antd';

const { Title } = Typography;

const Z_TimelineCard = ({ timeline = [] }) => {
  return (
    <Card
      title="时间经历"
    >
      <Timeline
        items={timeline.map(item => ({
          color: 'orange',
          children: (
            <div>
              <strong>{item.year}</strong> — {item.event}
            </div>
          ),
        }))}
      />
    </Card>
  );
};

export default Z_TimelineCard;
