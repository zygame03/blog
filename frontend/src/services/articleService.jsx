// frontend/src/services/articleService.jsx
import apiClient from './api';

export const articleService = {
  // 前端用户接口
  getArticles: (page = 1, pagesize = 10, keyword = '') =>
    apiClient.get('/api/article', { params: { page, pageSize: pagesize, keyword } }),

  getArticleById: (id) => apiClient.get(`/api/article/${id}`),
  getHotArticles: () => apiClient.get('/api/article/hotArticles'),
};

export const adminArticleService = {
  // 管理端接口
  adminGetArticles: (page = 1, pagesize = 10) =>
    apiClient.get('/api/admin/article', { params: { page, pagesize: pagesize,} }),

  adminGetArticleById: (id) => apiClient.get(`/api/admin/article/${id}`),
  
  adminCreateArticle: (payload) => apiClient.post('/api/admin/article', payload),
  adminUpdateArticle: (id, payload) => apiClient.put(`/api/admin/article/${id}`, payload),
  adminDeleteArticle: (id) => apiClient.delete(`/api/admin/article/${id}`),
  
  // 如果需要恢复功能
  adminRestoreArticle: (id) => apiClient.put(`/api/admin/article/${id}/restore`),
};