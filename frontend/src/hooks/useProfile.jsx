// src/hooks/useProfile.js
import { useState, useEffect } from 'react';
import { userService } from '../services/userService';

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

export const useProfile = () => {
  const [profile, setProfile] = useState(fallbackProfile);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await userService.getProfile();
        setProfile(response.data.data);
      } catch (err) {
        setError(err.message);
        console.error("获取用户信息失败:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  return { profile, loading, error };
};