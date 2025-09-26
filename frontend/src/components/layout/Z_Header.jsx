import { useState } from 'react';
import { Menu } from "antd";
import { useNavigate } from "react-router-dom"; // ✅ 引入

import "./Z_Header.css";

const items = [
  { label: '主页', key: '/home' },
  { label: '文章', key: '/article' },
  { label: '分类', key: '/classic' },
  { label: '关于', key: '/about' },
  { label: '链接', key: '/links' },
];

const Z_Header = () => {
  // const [current, setCurrent] = useState('/');
  const navigate = useNavigate(); 

  const getSelectedKey = () => {
    const path = location.pathname;
    const match = items.find(item => path.startsWith(item.key));
    return match ? match.key : '/';
  };


  const onClick = (e) => {
    // setCurrent(e.key);
    navigate(e.key); 
  };

  return (
    <Menu 
      onClick={onClick} 
      selectedKeys={[getSelectedKey()]} 
      mode="horizontal" 
      items={items} 
      theme='dark'
      className='z-header-menu'
    />
  );
};

export default Z_Header;
