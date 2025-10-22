// frontend/src/hooks/useAdminArticleDetail.jsx
import { useState, useEffect } from 'react';
import { adminArticleService } from '../services/articleService';

export const useAdminArticleDetail = (id) => {
  const [article, setArticle] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchArticle = async () => {
      if (!id) return;
      
      try {
        setLoading(true);
        setError(null);
        const response = await adminArticleService.adminGetArticleById(id);
        setArticle(response.data.data);
      } catch (err) {
        setError(err.message);
        console.error("获取管理端文章详情失败:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchArticle();
  }, [id]);

  return { article, loading, error };
};