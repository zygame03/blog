// src/hooks/useAuth.jsx
import { useCallback, useState, useRef } from 'react';
import { authService } from '../services/authService';

export const useAuth = () => {
  const [loading, setLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    try {
      return authService.isAuthed();
    } catch {
      return false;
    }
  });
  
  const loginAttemptRef = useRef(false);

  const login = useCallback(async (username, password) => {
    if (loginAttemptRef.current) {
      return { ok: false, message: '正在登录中，请稍候...' };
    }

    loginAttemptRef.current = true;
    setLoading(true);
    
    try {
      const response = await authService.login(username, password);
      
      // 添加调试日志
      console.log('登录响应:', response);
      console.log('响应数据:', response.data);
      
      let token = null;
      try {
        // 适配后端返回格式：{ code: 0, message: "SUCCESS", data: { token: "..." } }
        if (response.data.code === 0) {
          // 如果 data 是对象且包含 token
          if (typeof response.data.data === 'object' && response.data.data.token) {
            token = response.data.data.token;
          } 
          // 如果 data 直接是 token 字符串
          else if (typeof response.data.data === 'string') {
            token = response.data.data;
          }
        } else {
          throw new Error(response.data.message || '登录失败');
        }
      } catch (parseError) {
        console.error('解析登录响应失败:', parseError);
        throw new Error('登录响应格式错误');
      }
      
      if (!token || typeof token !== 'string') {
        console.error('未找到有效token:', { token, type: typeof token });
        throw new Error('未获取到有效的登录令牌');
      }
      
      authService.saveToken(token);
      setIsAuthenticated(true);
      
      return { ok: true };
    } catch (error) {
      console.error('登录失败:', error);
      const errorMessage = error?.response?.data?.message || 
                          error?.message || 
                          '登录失败，请检查用户名和密码';
      return { ok: false, message: errorMessage };
    } finally {
      setLoading(false);
      setTimeout(() => {
        loginAttemptRef.current = false;
      }, 1000);
    }
  }, []);

  const logout = useCallback(() => {
    try {
      authService.logout();
      setIsAuthenticated(false);
    } catch (error) {
      console.error('退出登录失败:', error);
    }
  }, []);

  const checkAuth = useCallback(() => {
    try {
      return authService.isAuthed();
    } catch (error) {
      console.error('检查登录状态失败:', error);
      return false;
    }
  }, []);

  return { 
    loading, 
    login, 
    logout, 
    isAuthed: checkAuth,
    isAuthenticated
  };
};