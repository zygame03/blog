import { useState, useEffect} from 'react';
import axios from 'axios';
import { Card, Typography, Tag } from 'antd';

import { API_BASE } from '../../../../api';

const { Title } = Typography;

const Z_HobbiesCard = () => {
  const [hobbies, setHobbies] = useState({});

  useEffect(() => {
    axios.get(`${API_BASE}/api/user/hobbies`)
      .then((res) => {
        setHobbies(res.data.data
          .replace(/^\[|\]$/g, "")
          .split(","));
      })
      .catch((err) => {
        console.error("获取 Article 失败", err);
      });
  }, []);

  console.info(hobbies)

  return (
    <Card 
      title='爱好'
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
