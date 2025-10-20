// src/hooks/useArticleDetail.js
import { useState, useEffect } from 'react';
import { articleService } from '../services/articleService';

export const useArticleDetail = (id) => {
  const [article, setArticle] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchArticle = async () => {
      if (!id) return;
      
      try {
        setLoading(true);
        setError(null);
        const response = await articleService.getArticleById(id);
        setArticle(response.data.data);
      } catch (err) {
        setError(err.message);
        console.error("获取文章详情失败:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchArticle();
  }, [id]);

  return { article, loading, error };
};