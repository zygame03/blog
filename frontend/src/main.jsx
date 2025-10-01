import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { ConfigProvider } from "antd";
import { AnimatePresence, motion } from "framer-motion";

import "./style/index.css";

import Z_Home from "./components/pages/home/Z_Home";
import Z_Article from "./components/pages/article/Z_Article";
import Z_ArticleDetail from "./components/pages/article/Z_ArticleDetail";
import Z_AboutMe from "./components/pages/about/Z_About";
import Z_Classic from "./components/pages/classic/Z_Classic";
import Z_Links from "./components/pages/links/Z_Links";
import Z_ScrollToTop from "./components/common/Z_ScrollTop";

const variants = {
  initial: { opacity: 0, x: 50 },
  enter: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -50 },
};

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        variants={variants}
        initial="initial"
        animate="enter"
        exit="exit"
        transition={{ duration: 0.3 }}
        style={{ minHeight: "100vh" }}
      >
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Z_Home />} />
          <Route path="/home" element={<Z_Home />} />
          <Route path="/article/:id" element={<Z_ArticleDetail />} />
          <Route path="/article" element={<Z_Article />} />
          <Route path="/about" element={<Z_AboutMe />} />
          <Route path="/classic" element={<Z_Classic />} />
          <Route path="/links" element={<Z_Links />} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <ConfigProvider 
    theme={{
        token: {
          colorPrimary: '#a51d1dff',
          fontSize: 20,
        },
    }}
  >
    <BrowserRouter>
      <Z_ScrollToTop />
      <AnimatedRoutes />
    </BrowserRouter>
  </ConfigProvider>
);
