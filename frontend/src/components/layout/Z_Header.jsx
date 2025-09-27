import { Layout, Menu } from "antd";
import { useNavigate } from "react-router-dom";
const { Header } = Layout;

const items = [
  { label: '主页', key: '/home' },
  { label: '文章', key: '/article' },
  { label: '分类', key: '/classic' },
  { label: '关于', key: '/about' },
  { label: '链接', key: '/links' },
];

const Z_Header = () => {
  const navigate = useNavigate(); 

  // 获取当前选中的菜单项
  const getSelectedKey = () => {
    const path = location.pathname;
    const match = items.find(item => path.startsWith(item.key));
    return match ? match.key : '/';
  };

  const onClick = (e) => {
    navigate(e.key); 
  };

  return (
    <Header
      style={{
        padding: 0,
        position: 'fixed',
        top: 0,
        width: '100%',
        zIndex: 1000,
        display: 'flex',
        justifyContent: 'center', // 居中容器
      }}
    >
      <div style={{width: '100%' }}>
        <Menu
          onClick={onClick}
          selectedKeys={[getSelectedKey()]}
          mode="horizontal"
          items={items}
          theme="light"
          style={{ justifyContent: 'center' }}
        />
      </div>
    </Header>
  );
};

export default Z_Header;
