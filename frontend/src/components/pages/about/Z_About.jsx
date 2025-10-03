import { Layout, Row, Col, Typography } from 'antd';

import Z_Header from '../../layout/Z_Header';
import Z_ProfileCard from '../../common/Z_ProfileCard';
import Z_SkillsCard from './components/Z_SkillsCard';
import Z_HobbiesCard from './components/Z_HobbiesCard';
import Z_CareerTimeline from './components/Z_CareerTimeline';
import Z_AboutSite from './components/Z_AboutSite';

const { Content, Footer } = Layout;
const { Title } = Typography;

// 数据
const skills = ['C', 'C++', 'Python', 'React', 'Go', 'Rust', 'Linux', 'Git'];
const hobbies = ['1', '2', '3', ];
const careerList = [
  { year: '2021', event: '大学', description: '信息安全', type: 'education' },
  { year: '2025', event: '毕业', description: '工学学士', type: 'education' },
  { year: '2025', event: '入职', description: '加入现公司', type: 'work' },
];

const Z_AboutMe = () => {
  return (
    <div>
      <Layout>
        <Z_Header />

        <Content 
          style={{ 
            padding: '20px 5%', 
            marginTop: 64 
          }}
        >
          <Row gutter={[24, 24]}>
            <Col md={12} xs={24} style={{ display: 'flex' }}>
              <Z_ProfileCard style={{ flex: 1 }} />
            </Col>

            <Col md={12} xs={24} style={{ display: 'flex' }}>
              <Z_SkillsCard
                skills={skills}
                style={{ flex: 1 }}
              />
            </Col>
            
            <Col md={12} xs={24} style={{ display: 'flex' }}>
              <Z_HobbiesCard
                hobbies={hobbies}
                style={{ flex: 1 }}
              />
            </Col>

            <Col xs={24}>
              <Z_AboutSite
                siteInfo={{
                  text: '记录学习与个人项目展示的博客网站。',
                  author: 'zygame',
                  year: 2025,
                }}
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
