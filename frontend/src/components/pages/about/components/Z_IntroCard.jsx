import React from 'react';
import { Card, Typography } from 'antd';

const { Paragraph } = Typography;

const Z_IntroCard = ({ text }) => {
  return (
    <Card
      style={{
        background: 'linear-gradient(135deg, #FFE0C2, #FFD1DC)',
        textAlign: 'center',
        padding: '24px',
      }}
    >
      <Paragraph
        style={{
          fontSize: '1.2rem',
          fontWeight: 500,
          color: '#5A3E36',
          margin: 0,
        }}
      >
        {text}
      </Paragraph>
    </Card>
  );
};

export default Z_IntroCard;
