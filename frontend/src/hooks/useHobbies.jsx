// src/hooks/useHobbies.js
import { useState, useEffect } from 'react';
import { userService } from '../services/userService';

const FALLBACK_HOBBIES = ['地理', '游戏', '音乐', '一个人'];

export const useHobbies = () => {
  const [hobbies, setHobbies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHobbies = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await userService.getHobbies();
        const data = response.data.data;
        
        let hobbiesArray = [];
        
        if (typeof data === 'string') {
          // 如果是字符串，按原来的方式处理
          hobbiesArray = data.replace(/^\[|\]$/g, "").split(",").filter(Boolean);
        } else if (typeof data === 'object' && data !== null) {
          // 如果是对象，尝试从不同字段获取爱好
          if (Array.isArray(data.hobbies)) {
            hobbiesArray = data.hobbies;
          } else if (typeof data.hobbies === 'string') {
            hobbiesArray = data.hobbies.replace(/^\[|\]$/g, "").split(",").filter(Boolean);
          } else if (Array.isArray(data)) {
            hobbiesArray = data;
          }
        }
        
        setHobbies(hobbiesArray.length > 0 ? hobbiesArray : FALLBACK_HOBBIES);
      } catch (err) {
        setError(err.message);
        console.error("获取爱好失败:", err);
        setHobbies(FALLBACK_HOBBIES);
      } finally {
        setLoading(false);
      }
    };

    fetchHobbies();
  }, []);

  return { hobbies, loading, error };
};