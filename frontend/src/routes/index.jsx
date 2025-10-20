// src/routes/index.jsx
import { Routes, Route } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

import Z_Home from "../pages/Z_Home";
import Z_Article from "../pages/Z_Article";
import Z_ArticleDetail from "../pages/Z_ArticleDetail";
import Z_AboutMe from "../pages/Z_About";
import Z_Classic from "../pages/Z_Classic";
import Z_Links from "../pages/Z_Links";

import Z_Login from "../pages/Z_Login";

import Z_AdminArticles from "../pages/admin/Z_AdminArticle";

import ProtectedRoute from "./protectedRoute";

const variants = {
  initial: { opacity: 0, x: 50 },
  enter: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -50 },
};

export const AppRoutes = () => {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        variants={variants}
        initial="initial"
        animate="enter"
        exit="exit"
        transition={{ duration: 0.3 }}
        style={{ minHeight: "100vh" }}
      >
        <Routes>
          <Route path="/" element={<Z_Home />} />
          <Route path="/login" element={<Z_Login />} />
          <Route path="/home" element={<Z_Home />} />
          <Route path="/article/:id" element={<Z_ArticleDetail />} />
          <Route path="/article" element={<Z_Article />} />
          <Route path="/about" element={<Z_AboutMe />} />
          <Route path="/classic" element={<Z_Classic />} />
          <Route path="/links" element={<Z_Links />} />
          <Route
            path="/admin/articles"
            element={
              <ProtectedRoute>
                <Z_AdminArticles />
              </ProtectedRoute>
            }
          />
        </Routes>
      </motion.div>
    </AnimatePresence>
  );
};