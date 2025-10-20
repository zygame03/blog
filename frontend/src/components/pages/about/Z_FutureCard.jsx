// src/components/pages/about/Z_FutureCard.jsx
import React from 'react';
import { Card, List, Typography, Spin, message } from 'antd';
import { useFutureGoals } from '../../../hooks/useFutureGoals';

const { Title } = Typography;

const Z_FutureCard = () => {
  const { goals, loading, error } = useFutureGoals();

  if (error) {
    message.error('未来计划加载失败');
  }

  return (
    <Card title="未来计划">
      {loading ? (
        <Spin size="small" />
      ) : (
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
      )}
    </Card>
  );
};

export default Z_FutureCard;