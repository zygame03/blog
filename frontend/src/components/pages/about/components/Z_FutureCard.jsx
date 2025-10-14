import React from 'react';
import { Card, List, Typography } from 'antd';

const { Title } = Typography;

const Z_FutureCard = ({ goals = [] }) => {
  return (
    <Card 
      title="未来计划"
    >
      <List
        dataSource={goals}
        renderItem={(item) => (
          <List.Item
            style={{
              border: 'none',
              padding: '8px 0',
              fontSize: '1rem',
            }}
          >
            🚀 {item}
          </List.Item>
        )}
      />
    </Card>
  );
};

export default Z_FutureCard;
