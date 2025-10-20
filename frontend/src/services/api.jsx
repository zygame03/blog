// src/services/api.jsx
import axios from 'axios';
import { authService } from './authService';

const API_BASE = "http://127.0.0.1:8080";

const apiClient = axios.create({
  baseURL: API_BASE,
  timeout: 10000,
});

// 请求拦截器 - 简化版本
apiClient.interceptors.request.use(
  (config) => {
    try {
      const token = authService.getToken();
      if (token) {
        config.headers = config.headers || {};
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (error) {
      console.error('设置请求头失败:', error);
    }
    return config;
  },
  (error) => {
    console.error('请求拦截器错误:', error);
    return Promise.reject(error);
  }
);

// 响应拦截器 - 简化版本，移除自动跳转
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // 只记录错误，不进行任何自动操作
    if (error?.response?.status === 401) {
      console.warn('收到 401 响应，可能需要重新登录');
      // 不自动跳转，让组件自己处理
    }
    return Promise.reject(error);
  }
);

export default apiClient;