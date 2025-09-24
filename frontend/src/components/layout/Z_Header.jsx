import { useState } from 'react';
import { Menu } from "antd";

import "./Z_Header.css";

const items = [
  {
    label: '主页',
    key: 'Home',
  },
  {
    label: '文章',
    key: 'Articles',
  },
  {
    label: '分类',
    key: 'Classic',
  },
  {
    label: '关于',
    key: 'About',
  },
  {
    label: '链接',
    key: 'Links',
  },
];

const Z_Header = () => {
  const [current, setCurrent] = useState('mail');
  const onClick = e => {
    console.log('click ', e);
    setCurrent(e.key);
  };

  return (
    <Menu 
      onClick={onClick} 
      selectedKeys={[current]} 
      mode="horizontal" 
      items={items} 
      theme='dark'
      className='z-header-menu'
    />
  );
};

export default Z_Header;