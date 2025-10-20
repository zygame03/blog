// src/hooks/useIntro.js
import { useState, useEffect } from 'react';
import { userService } from '../services/userService';

const FALLBACK_INTRO = "热爱底层系统的开发者，专注于构建稳定、高效、优雅的系统。";

export const useIntro = () => {
  const [intro, setIntro] = useState(FALLBACK_INTRO);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchIntro = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await userService.getIntro();
        const data = response.data.data;
        
        // 处理不同的数据格式
        if (typeof data === 'string') {
          setIntro(data || FALLBACK_INTRO);
        } else if (typeof data === 'object' && data !== null) {
          // 如果返回的是对象，尝试从不同字段获取介绍
          setIntro(data.intro || data.signature || data.description || FALLBACK_INTRO);
        } else {
          setIntro(FALLBACK_INTRO);
        }
      } catch (err) {
        setError(err.message);
        console.error("获取个人介绍失败:", err);
        setIntro(FALLBACK_INTRO);
      } finally {
        setLoading(false);
      }
    };

    fetchIntro();
  }, []);

  return { intro, loading, error };
};