// src/components/common/Z_ProfileCard.jsx
import { Card, Avatar, Typography, Spin, Affix } from "antd";
import { useProfile } from "../../../hooks/useProfile";

const { Title, Text } = Typography;

const Z_ProfileCard = () => {
  const { profile, loading, error } = useProfile();

  if (error) {
    console.error("获取用户信息失败:", error);
  }

  return (
    <Affix offsetTop={80}>
      <Card style={{ textAlign: "center" }}>
        {loading ? (
          <Spin tip="加载中..." />
        ) : (
          <>
            <Avatar size={100} src={profile.avatar} style={{ marginBottom: 12 }} />
            <Title level={4}>{profile.name}</Title>
            <Text type="secondary">{profile.signature}</Text>
          </>
        )}
      </Card>
    </Affix>
  );
};

export default Z_ProfileCard;