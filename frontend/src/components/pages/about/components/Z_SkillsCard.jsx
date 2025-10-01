import React from 'react';
import { Card, Typography } from 'antd';
import Z_SkillIconMap from '../../../common/Z_SkillIconMap'; 

const { Title } = Typography;

const Z_SkillsCard = ({ skills = [] }) => {
  return (
    <Card
      title="个人技能"
      style={{
        width: '100%',
        boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
      }}
    >
      <div
        style={{
          marginTop: 12,
          display: 'flex',
          flexWrap: 'wrap',
          gap: 12,
        }}
      >
        {skills && skills.length > 0 ? (
          skills.map((skill, idx) => {
            const iconClass = Z_SkillIconMap[skill] || 'devicon-devicon-plain';

            return (
              <div
                key={idx}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  background: '#f7f7f7',
                  padding: '4px 6px',
                  borderRadius: '26px',
                }}
              >
                <span
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: 44,
                    height: 44,
                    borderRadius: '50%',
                    marginRight: 6,
                    fontSize: 28,
                  }}
                >
                  <i className={`${iconClass} colored`} />
                </span>
                <span style={{ paddingRight: '10px' }}>{skill}</span>
              </div>
            );
          })
        ) : (
          <span>暂无技能</span>
        )}
      </div>
    </Card>
  );
};

export default Z_SkillsCard;
