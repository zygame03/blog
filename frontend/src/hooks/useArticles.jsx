// src/hooks/useArticles.js
import { useState, useEffect, useMemo } from 'react';
import { articleService } from '../services/articleService';

const PAGE_SIZE = 10;

export const useArticles = (page = 1, pageSize = PAGE_SIZE) => {
  const [articles, setArticles] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchArticles = async (pageNum = page) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await articleService.getArticles(pageNum, pageSize);
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
      console.error("获取文章列表失败:", err);
    } finally {
      setLoading(false);
    }
  };

  // 按年份分组
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
  }, [page, pageSize]);

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