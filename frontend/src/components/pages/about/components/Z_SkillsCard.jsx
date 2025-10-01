import React from 'react';
import { Card, Typography, Tag } from 'antd';

const { Title } = Typography;

/**
 * skills: Array<string>
 */
const Z_SkillsCard = ({ skills = [] }) => {
  return (
    <Card
      title='个人技能'
      style={{
        width: '100%',
        textAlign: 'center',
        borderRadius: 8,
        boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
      }}
    >
      <div style={{ marginTop: 12 }}>
        {skills.length > 0 ? (
          skills.map((skill, idx) => (
            <Tag key={idx} color="geekblue" style={{ marginBottom: 8 }}>
              {skill}
            </Tag>
          ))
        ) : (
          <span>暂无技能</span>
        )}
      </div>
    </Card>
  );
};

export default Z_SkillsCard;
