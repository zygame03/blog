import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './components/pages/Z_Home';
import Z_Article from './components/pages/Z_Article';  // 文章详情页

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="article/:id" element={<Z_Article />} />
    </Routes>
  </BrowserRouter>
);
