import React, { useEffect, useState } from "react";
import { Card, Avatar, Typography, Divider, Spin } from "antd";
import axios from "axios";
import { API_BASE } from "../../api";

const { Title, Text } = Typography;



// 保底数据（默认展示）
const fallbackProfile = {
  ID: 0,
  avatar: "/avatar_default.jpg",
  name: "Unknow",
  signature: "Unknow",
  links: {
    github: "https://github.com/zygame03",
    bilibili: "https://bilibili.com/"
  },
  notice: "Unknow"
};

const Z_Profile = () => {
  const [profile, setProfile] = useState(fallbackProfile);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`${API_BASE}/api/profile`)
      .then((res) => {
        setProfile(res.data); // axios 已经解析好了 JSON
        setLoading(false);
      })
      .catch((err) => {
        console.error("获取 profile 失败，使用保底数据:", err);
        setLoading(false); // 失败时仍然展示 fallback
      });
  }, []);


  return (
    <Card 
      style={{
          textAlign: "center",
          marginBottom: 0, // 减小卡片之间的间距
          padding: 10, // 减小卡片的内边距
          borderRadius: 8, // 边角圆滑
          boxShadow: '0 2px 8px rgba(0,0,0,0.15)' // 添加适度阴影提升卡片视觉层次
        }}
      >
      {loading ? (
        <Spin tip="加载中..." />
      ) : (
        <>
          <Avatar size={80} src={profile.avatar} style={{ marginBottom: 12 }} />

          <Title level={4}>{profile.name}</Title>

          <Text type="secondary">{profile.signature}</Text>

          <Divider />

          <div>
            <a href={profile.links.github} target="_blank" rel="noreferrer">
              GitHub
            </a>
            {" | "}
            <a href={profile.links.bilibili} target="_blank" rel="noreferrer">
              B站
            </a>
          </div>

          <Divider />

          <Text strong>{profile.notice}</Text>
        </>
      )}
    </Card>
  );
};

export default Z_Profile;