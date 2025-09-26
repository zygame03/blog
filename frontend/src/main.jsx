import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Z_Home from './components/pages/Z_Home';
import Z_Article from './components/pages/Z_ArticleDetail';  // 文章详情页
import Z_AboutMe from './components/pages/Z_AboutMe';
import { ConfigProvider } from "antd";

ReactDOM.createRoot(document.getElementById('root')).render(
  <ConfigProvider
    theme={{
      token: {
        colorBgContainer: "#ffffffff", // 背景色（深色导航）
        colorText: "#000000ff",           // 默认文字颜色
        // colorPrimary: "#1677ff",     // 选中高亮色
        fontSize: 18,                // 导航字号
      },
      components: {
        Menu: {
          itemSelectedColor: "#1677ff",
          itemSelectedBg: "transparent", // 去掉选中背景，只保留文字高亮
          itemHoverColor: "#69b1ff",
        },
      },
    }}
  >
    <BrowserRouter>
      <Routes>
        <Route path="/home" element={<Z_Home />} />
        <Route path="article/:id" element={<Z_Article />} />
        <Route path='about' element={<Z_AboutMe />} />
      </Routes>
    </BrowserRouter>
  </ConfigProvider>
);
