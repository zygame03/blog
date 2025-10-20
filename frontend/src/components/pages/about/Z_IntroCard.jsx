// src/components/pages/about/Z_IntroCard.jsx
import React from 'react';
import { Card, Typography, Spin, message } from 'antd';
import { useIntro } from '../../../hooks/useIntro';

const { Paragraph } = Typography;

const Z_IntroCard = () => {
  const { intro, loading, error } = useIntro();

  if (error) {
    message.error('个人介绍加载失败');
  }

  return (
    <Card
      style={{
        background: 'linear-gradient(135deg, #FFE0C2, #FFD1DC)',
        textAlign: 'center',
        padding: '24px',
      }}
    >
      {loading ? (
        <Spin size="large" />
      ) : (
        <Paragraph
          style={{
            fontSize: '1.2rem',
            fontWeight: 500,
            color: '#5A3E36',
            margin: 0,
          }}
        >
          {intro}
        </Paragraph>
      )}
    </Card>
  );
};

export default Z_IntroCard;