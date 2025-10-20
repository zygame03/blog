// src/hooks/useHotArticles.js
import { useState, useEffect } from 'react';
import { articleService } from '../services/articleService';

export const useHotArticles = () => {
  const [hotArticles, setHotArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHotArticles = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await articleService.getHotArticles();
        setHotArticles(response.data.data);
      } catch (err) {
        setError(err.message);
        console.error("获取热门文章失败:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchHotArticles();
  }, []);

  return { hotArticles, loading, error };
};