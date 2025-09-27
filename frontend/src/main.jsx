import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Z_Home from './components/pages/Z_Home';
import Z_ArticleDetail from './components/pages/Z_ArticleDetail';  // 文章详情页
import Z_AboutMe from './components/pages/Z_AboutMe';
import Z_Article from './components/pages/Z_Article';
import Z_Classic from './components/pages/Z_Classic';
import Z_Links from './components/pages/Z_Links';

import "./style/index.css"
import { ConfigProvider } from "antd";

ReactDOM.createRoot(document.getElementById('root')).render(
  <ConfigProvider
    theme={{
    }}
  >
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Z_Home />} />
        <Route path="/home" element={<Z_Home />} />
        <Route path="/article/:id" element={<Z_ArticleDetail />} />
        <Route path="/article" element={<Z_Article />} />
        <Route path='/about' element={<Z_AboutMe />} />
        <Route path='/classic' element={<Z_Classic />} />
        <Route path='/links' element={<Z_Links />} />
      </Routes>
    </BrowserRouter>
  </ConfigProvider>
);
