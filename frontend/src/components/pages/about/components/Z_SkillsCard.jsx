import { useState, useEffect} from 'react';
import axios from 'axios';
import { Card, Typography } from 'antd';
import Z_SkillIconMap from '../../../common/Z_SkillIconMap'; 

import { API_BASE } from '../../../../api';

const { Title } = Typography;

const Z_SkillsCard = () => {
  const [skills, setSkills] = useState({});

  useEffect(() => {
    axios.get(`${API_BASE}/api/user/skills`)
      .then((res) => {
        setSkills(res.data.data
          .replace(/^\[|\]$/g, "")
          .split(","));
      })
      .catch((err) => {
        console.error("获取 Article 失败", err);
      });
  }, []);


  return (
    <Card 
      title="技能"
      style={{
        boxShadow: '0 4px 12px rgba(255, 165, 130, 0.25)',
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
