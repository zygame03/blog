// src/services/userService.jsx
import apiClient from './api';

export const userService = {
  // 获取用户信息
  getProfile: () => 
    apiClient.get('/api/user/profile'),
  
  // 获取个人介绍
  getIntro: () => 
    apiClient.get('/api/user/intro'),
  
  // 获取技能列表
  getSkills: () => 
    apiClient.get('/api/user/skills'),
  
  // 获取爱好列表
  getHobbies: () => 
    apiClient.get('/api/user/hobbies'),
  
  // 获取时间轴
  getTimeline: () => 
    apiClient.get('/api/user/timeline'),
  
  // 获取未来计划
  getFutureGoals: () => 
    apiClient.get('/api/user/futureGoals'),
};