// src/hooks/useFutureGoals.js
import { useState, useEffect } from 'react';
import { userService } from '../services/userService';

const FALLBACK_GOALS = ['完善博客生态', '发布开源项目', '撰写技术文章合集'];

export const useFutureGoals = () => {
  const [goals, setGoals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGoals = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await userService.getFutureGoals();
        setGoals(response.data.data || FALLBACK_GOALS);
      } catch (err) {
        setError(err.message);
        console.error("获取未来计划失败:", err);
        setGoals(FALLBACK_GOALS);
      } finally {
        setLoading(false);
      }
    };

    fetchGoals();
  }, []);

  return { goals, loading, error };
};