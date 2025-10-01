// src/components/common/ScrollToTop.jsx
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const Z_ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);  // 切换路由时自动回到顶部
  }, [pathname]);

  return null;
};

export default Z_ScrollToTop;
