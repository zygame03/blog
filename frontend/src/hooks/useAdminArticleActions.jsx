// frontend/src/hooks/useAdminArticleActions.jsx
import { useState } from 'react';
import { adminArticleService } from '../services/articleService';
import { message } from 'antd';

export const useAdminArticleActions = () => {
  const [loading, setLoading] = useState(false);

  const createArticle = async (payload) => {
    setLoading(true);
    try {
      const response = await adminArticleService.adminCreateArticle(payload);
      message.success('文章创建成功');
      return { success: true, data: response.data };
    } catch (error) {
      message.error('文章创建失败');
      console.error('创建文章失败:', error);
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  const updateArticle = async (id, payload) => {
    setLoading(true);
    try {
      const response = await adminArticleService.adminUpdateArticle(id, payload);
      message.success('文章更新成功');
      return { success: true, data: response.data };
    } catch (error) {
      message.error('文章更新失败');
      console.error('更新文章失败:', error);
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  const deleteArticle = async (id) => {
    setLoading(true);
    try {
      await adminArticleService.adminDeleteArticle(id);
      message.success('文章删除成功');
      return { success: true };
    } catch (error) {
      message.error('文章删除失败');
      console.error('删除文章失败:', error);
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  const restoreArticle = async (id) => {
    setLoading(true);
    try {
      await adminArticleService.adminRestoreArticle(id);
      message.success('文章恢复成功');
      return { success: true };
    } catch (error) {
      message.error('文章恢复失败');
      console.error('恢复文章失败:', error);
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    createArticle,
    updateArticle,
    deleteArticle,
    restoreArticle
  };
};