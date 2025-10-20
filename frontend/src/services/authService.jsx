// src/services/authService.jsx
import apiClient from './api';

export const TOKEN_KEY = 'token';

export const authService = {
  login: (username, password) => apiClient.post('/api/admin/login', { username, password }),
  logout: () => {
    localStorage.removeItem(TOKEN_KEY);
  },
  saveToken: (token) => {
    localStorage.setItem(TOKEN_KEY, token);
  },
  getToken: () => localStorage.getItem(TOKEN_KEY),
  isAuthed: () => !!localStorage.getItem(TOKEN_KEY),
};