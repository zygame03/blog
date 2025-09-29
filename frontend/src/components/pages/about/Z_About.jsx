import { useEffect, useState } from 'react';
import { Layout, Row, Col, Typography } from 'antd';
import axios from 'axios';

import Z_Header from '../../layout/Z_Header';
import Z_ProfileCard from '../../common/Z_ProfileCard';
import Z_SkillsCard from './components/Z_SkillsCard';
import Z_HobbiesCard from './components/Z_HobbiesCard';
import Z_CareerTimeline from './components/Z_CareerTimeline';
import Z_AboutSite from './components/Z_AboutSite';

import { API_BASE } from '../../../api';

const { Content, Footer } = Layout;
const { Title } = Typography;

// 数据
const skills = ['C/C++', 'Python', 'React', 'Go', 'Rust', 'Linux', 'Git'];
const hobbies = ['唱', '跳', 'Rap', '篮球'];
const careerList = [
  { year: '2021', event: '大学', description: '信息安全', type: 'education' },
  { year: '2025', event: '毕业', description: '工学学士', type: 'education' },
  { year: '2025', event: '入职', description: '加入现公司', type: 'work' },
];

// 保底数据
const fallbackProfile = {
  ID: 0,
  avatar: '/avatar_default.jpg',
  name: 'Unknow',
  signature: 'Unknow',
  links: {
    github: 'https://github.com/zygame03',
    bilibili: 'https://bilibili.com/',
  },
  notice: '暂无公告',
};

const Z_AboutMe = () => {
  const [profile, setProfile] = useState(fallbackProfile);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`${API_BASE}/api/profile`)
      .then((res) => {
        setProfile(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('获取 profile 失败，使用保底数据:', err);
        setLoading(false);
      });
  }, []);

  return (
    <div style={{ minWidth: '800px' }}>
      <Layout>
        <Z_Header />

        <Content style={{ padding: '20px 10%', marginTop: 64 }}>

          <Row gutter={[24, 24]} align="top">
            <Col xs={24} md={12} lg={8}>
              <Z_ProfileCard profile={profile} loading={loading} style={{ width: '100%' }} />
            </Col>

            <Col xs={24} md={12} lg={8}>
              <Z_SkillsCard skills={skills} style={{ width: '100%' }}/>
            </Col>

            <Col xs={24} md={12} lg={8}>
              <Z_HobbiesCard hobbies={hobbies} style={{ width: '100%' }}/>
            </Col>

            <Col xs={24}>
              <Z_CareerTimeline careerList={careerList} layout="horizontal" style={{ width: '100%' }}/>
            </Col>

            <Col xs={24}>
              <Z_AboutSite
                siteInfo={{
                  text: '记录学习笔记与个人项目展示的博客网站。',
                  author: 'zygame',
                  year: 2025,
                }}
                style={{ width: '100%' }}
              />
            </Col>
          </Row>
        </Content>

        <Footer style={{ textAlign: 'center' }}>
          Ant Design ©{new Date().getFullYear()} Created by Ant UED
        </Footer>
      </Layout>
    </div>
  );
};

export default Z_AboutMe;
