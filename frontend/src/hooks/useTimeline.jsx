// src/hooks/useTimeline.js
import { useState, useEffect } from 'react';
import { userService } from '../services/userService';

const FALLBACK_TIMELINE = [
  { year: '2022', event: '开始学习编程' },
  { year: '2023', event: '深入学习系统编程' },
  { year: '2024', event: '开始开源项目开发' },
  { year: '2025', event: '构建个人博客系统' },
];

export const useTimeline = () => {
  const [timeline, setTimeline] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTimeline = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await userService.getTimeline();
        const data = response.data.data;
        
        let timelineArray = [];
        
        if (Array.isArray(data)) {
          timelineArray = data;
        } else if (typeof data === 'object' && data !== null) {
          // 如果返回的是对象，尝试从不同字段获取时间轴
          if (Array.isArray(data.timeline)) {
            timelineArray = data.timeline;
          } else if (Array.isArray(data.events)) {
            timelineArray = data.events;
          } else if (Array.isArray(data.experiences)) {
            timelineArray = data.experiences;
          }
        }
        
        setTimeline(timelineArray.length > 0 ? timelineArray : FALLBACK_TIMELINE);
      } catch (err) {
        setError(err.message);
        console.error("获取时间轴失败:", err);
        setTimeline(FALLBACK_TIMELINE);
      } finally {
        setLoading(false);
      }
    };

    fetchTimeline();
  }, []);

  return { timeline, loading, error };
};