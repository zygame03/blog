import React from 'react';
import { Card, Typography, Tag } from 'antd';

const { Title } = Typography;

const Z_HobbiesCard = ({ hobbies = [] }) => {
  return (
    <Card 
      title='爱好'
      style={{
        boxShadow: '0 4px 12px rgba(255, 165, 130, 0.25)',
      }}
    >
      <div style={{ marginTop: 12 }}>
        {hobbies.length > 0 ? (
          hobbies.map((hobby, idx) => (
            <Tag key={idx} color="magenta" style={{ marginBottom: 8 }}>
              {hobby}
            </Tag>
          ))
        ) : (
          <span>暂无爱好</span>
        )}
      </div>
    </Card>
  );
};

export default Z_HobbiesCard;
