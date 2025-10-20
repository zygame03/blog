// src/services/articleService.jsx
import apiClient from './api';

export const articleService = {
  // 列表
  getArticles: (page = 1, pagesize = 10, keyword = '') =>
    apiClient.get('/api/article', { params: { page, pageSize: pagesize, keyword } }),

  // 详情
  getArticleById: (id) => apiClient.get(`/api/article/${id}`),

  // 热门
  getHotArticles: () => apiClient.get('/api/article/hotArticles'),

  // 新增（后台）
  createArticle: (payload) => apiClient.post('/api/admin/article', payload),

  // 更新（后台）
  updateArticle: (id, payload) => apiClient.put(`/api/admin/article/${id}`, payload),

  // 删除（后台）
  deleteArticle: (id) => apiClient.delete(`/api/admin/article/${id}`),
};