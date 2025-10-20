// src/components/pages/about/Z_HobbiesCard.jsx
import { Card, Typography, Tag, Spin, message } from 'antd';
import { useHobbies } from '../../../hooks/useHobbies';

const { Title } = Typography;

const Z_HobbiesCard = () => {
  const { hobbies, loading, error } = useHobbies();

  if (error) {
    message.error('爱好加载失败');
  }

  return (
    <Card title='爱好'>
      <div style={{ marginTop: 12 }}>
        {loading ? (
          <Spin size="small" />
        ) : hobbies.length > 0 ? (
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