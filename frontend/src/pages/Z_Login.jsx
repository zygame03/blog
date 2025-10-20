// src/pages/Z_Login.jsx
import { useState, useRef } from 'react';
import { Card, Form, Input, Button, Typography, message, Layout } from 'antd';
import { useNavigate, useLocation } from 'react-router-dom';
import Z_Header from '../components/layout/Z_Header';
import Z_Content from '../components/layout/Z_Content';
import Z_Footer from '../components/layout/Z_Footer';
import { useAuth } from '../hooks/useAuth';

const { Title } = Typography;

const Z_Login = () => {
  const { loading, login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const formRef = useRef(null);

  const getRedirectPath = () => {
    return location.state?.from?.pathname || '/home';
  };

  const handleSubmit = async (values) => {
    if (isSubmitting) {
      message.warning('正在处理中，请稍候...');
      return;
    }

    setIsSubmitting(true);
    
    try {
      const { username, password } = values;
      const result = await login(username, password);
      
      if (result.ok) {
        message.success('登录成功');
        // 使用 setTimeout 确保状态更新完成后再跳转
        setTimeout(() => {
          navigate(getRedirectPath(), { replace: true });
        }, 100);
      } else {
        message.error(result.message || '登录失败');
      }
    } catch (error) {
      console.error('登录处理异常:', error);
      message.error('登录异常，请重试');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Layout>
      <Z_Header />
      <Z_Content>
        <div style={{ display: 'flex', justifyContent: 'center', padding: '50px 0' }}>
          <Card style={{ width: 400 }}>
            <Title level={3} style={{ textAlign: 'center', marginBottom: 24 }}>
              用户登录
            </Title>
            <Form
              ref={formRef}
              layout="vertical"
              onFinish={handleSubmit}
              autoComplete="off"
            >
              <Form.Item
                label="用户名"
                name="username"
                rules={[
                  { required: true, message: '请输入用户名' },
                  { min: 2, message: '用户名至少2个字符' }
                ]}
              >
                <Input 
                  placeholder="请输入用户名" 
                  autoComplete="username"
                  disabled={isSubmitting}
                />
              </Form.Item>
              
              <Form.Item
                label="密码"
                name="password"
                rules={[
                  { required: true, message: '请输入密码' },
                  { min: 6, message: '密码至少6个字符' }
                ]}
              >
                <Input.Password 
                  placeholder="请输入密码" 
                  autoComplete="current-password"
                  disabled={isSubmitting}
                />
              </Form.Item>
              
              <Form.Item style={{ marginBottom: 0 }}>
                <Button 
                  type="primary" 
                  htmlType="submit" 
                  block 
                  loading={loading || isSubmitting}
                  disabled={isSubmitting}
                  size="large"
                >
                  {isSubmitting ? '登录中...' : '登录'}
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </div>
      </Z_Content>
      <Z_Footer />
    </Layout>
  );
};

export default Z_Login;