import { Layout, Row, Col } from 'antd';
import Z_Header from '../../layout/Z_Header';
import Z_Content from '../../layout/Z_Content';

import Z_IntroCard from './components/Z_IntroCard';
import Z_TimelineCard from './components/Z_TimelineCard';
import Z_SkillsCard from './components/Z_SkillsCard';
import Z_HobbiesCard from './components/Z_HobbiesCard';
import Z_AboutSite from './components/Z_AboutSite';
// import Z_FocusCard from './components/Z_FocusCard';
import Z_FutureCard from './components/Z_FutureCard';
// import Z_ContactCard from './components/Z_ContactCard';

const { Footer } = Layout;

// 数据示例
const skills = ['C', 'C++', 'Go', 'Rust', 'React', 'Linux', 'Git'];
const hobbies = ['地理', '游戏', '音乐', '一个人'];
const timeline = [
  { year: '2022', event: '测试' },
  { year: '2023', event: '测试' },
  { year: '2024', event: '测试' },
  { year: '2025', event: '测试' },
];

const Z_AboutMe = () => {
  return (
    <>
      <Layout>
        <Z_Header />

        <Z_Content>
          <Row gutter={[16, 16]}>
            {/* 一句话介绍 */}
            <Col xs={24}>
              <Z_IntroCard text="热爱底层系统的开发者，专注于构建稳定、高效、优雅的系统。" />
            </Col>

            {/* 时间轴卡片 */}
            <Col xs={24}>
              <Z_TimelineCard timeline={timeline} />
            </Col>

            {/* 技能卡片 */}
            <Col md={12} xs={24}>
              <Z_SkillsCard skills={skills} />
            </Col>

            {/* 爱好卡片 */}
            <Col md={12} xs={24}>
              <Z_HobbiesCard hobbies={hobbies} />
            </Col>

            {/* 当前关注方向 */}
            {/* <Col md={12} xs={24}>
              <Z_FocusCard focuses={['NuttX 内核', 'Rust 系统开发', '高性能后端设计']} />
            </Col> */}

            {/* 未来计划 */}
            <Col md={12} xs={24}>
              <Z_FutureCard goals={['完善博客生态', '发布开源项目', '撰写技术文章合集']} />
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

            {/* 联系方式 */}
            {/* <Col xs={24}>
              <Z_ContactCard
                contacts={{
                  email: 'zygame@example.com',
                  github: 'https://github.com/zygame',
                  bilibili: 'https://space.bilibili.com/xxxx',
                }}
              />
            </Col> */}
          </Row>
        </Z_Content>

        <Footer style={{ textAlign: 'center' }}>
          ©{new Date().getFullYear()} zygame | Built with React + Go
        </Footer>
      </Layout>
    </>
  );
};

export default Z_AboutMe;
