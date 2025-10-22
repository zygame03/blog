// frontend/src/hooks/useAdminArticles.jsx
import { useState, useEffect, useMemo } from 'react';
import { adminArticleService } from '../services/articleService';

const PAGE_SIZE = 10;

export const useAdminArticles = (page = 1, pageSize = PAGE_SIZE, keyword = '') => {
  const [articles, setArticles] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchArticles = async (pageNum = page, searchKeyword = keyword) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await adminArticleService.adminGetArticles(pageNum, pageSize, searchKeyword);
      const data = response.data.data;
      
      let list = [];
      let totalCount = 0;

      if (Array.isArray(data)) {
        list = data;
        totalCount = data.length;
      } else {
        list = data.list ?? data.data ?? data.items ?? [];
        totalCount = data.total ?? data.count ?? data.totalCount ?? list.length;
      }

      setArticles(list);
      setTotal(totalCount);
    } catch (err) {
      setError(err.message);
      console.error("获取管理端文章列表失败:", err);
    } finally {
      setLoading(false);
    }
  };

  // 按年份分组（可选，管理端可能不需要）
  const grouped = useMemo(() => {
    return articles.reduce((acc, item) => {
      const time = item.created_at ?? item.createdAt ?? item.updated_at ?? item.updatedAt;
      const year = time ? new Date(time).getFullYear() : "未知";
      if (!acc[year]) acc[year] = [];
      acc[year].push(item);
      return acc;
    }, {});
  }, [articles]);

  const years = useMemo(() => Object.keys(grouped).sort((a, b) => b - a), [grouped]);

  useEffect(() => {
    fetchArticles();
  }, [page, pageSize, keyword]);

  return {
    articles,
    grouped,
    years,
    total,
    loading,
    error,
    refetch: fetchArticles
  };
};