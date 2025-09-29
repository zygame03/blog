import React from 'react';
import { Card, Typography, Tag } from 'antd';

const { Title } = Typography;

/**
 * hobbies: Array<string>
 */
const Z_HobbiesCard = ({ hobbies = [] }) => {
  return (
    <Card
      title='个人爱好'
      style={{
        maxWidth: 400,
        width: '100%',
        textAlign: 'center',
        borderRadius: 8,
        boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
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
