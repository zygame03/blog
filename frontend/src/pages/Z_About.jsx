// src/pages/Z_About.jsx
import { Layout, Row, Col } from 'antd';
import Z_Header from '../components/layout/Z_Header';
import Z_Content from '../components/layout/Z_Content';

import Z_IntroCard from '../components/pages/about/Z_IntroCard';
import Z_TimelineCard from '../components/pages/about/Z_TimelineCard';
import Z_SkillsCard from '../components/pages/about/Z_SkillsCard';
import Z_HobbiesCard from '../components/pages/about/Z_HobbiesCard';
import Z_AboutSite from '../components/pages/about/Z_AboutSite';
import Z_FutureCard from '../components/pages/about/Z_FutureCard';
import Z_Footer from '../components/layout/Z_Footer';

const Z_About = () => {
  return (
    <>
      <Layout>
        <Z_Header />

        <Z_Content>
          <Row gutter={[16, 16]}>
            {/* 一句话介绍 */}
            <Col xs={24}>
              <Z_IntroCard />
            </Col>

            {/* 时间轴卡片 */}
            <Col xs={24}>
              <Z_TimelineCard />
            </Col>

            {/* 技能卡片 */}
            <Col md={12} xs={24}>
              <Z_SkillsCard />
            </Col>

            {/* 爱好卡片 */}
            <Col md={12} xs={24}>
              <Z_HobbiesCard />
            </Col>

            {/* 未来计划 */}
            <Col md={12} xs={24}>
              <Z_FutureCard />
            </Col>

            {/* 关于本站 */}
            <Col xs={24}>
              <Z_AboutSite
                siteInfo={{
                  text: '这个博客旨在记录学习、生活和创作的过程。前端使用 React + Vite + Ant Design，后端采用 Go + PostgreSQL。',
                  author: 'zygame',
                  year: 2025,
                }}
              />
            </Col>
          </Row>
        </Z_Content>

        <Z_Footer />
      </Layout>
    </>
  );
};

export default Z_About;