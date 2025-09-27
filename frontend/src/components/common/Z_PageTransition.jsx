// PageTransition.jsx
import { useLocation, Outlet } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const variants = {
  initial: { opacity: 0, x: 50 },   // 页面进入前
  enter: { opacity: 1, x: 0 },      // 页面进入时
  exit: { opacity: 0, x: -50 },     // 页面退出时
};

const Z_PageTransition = () => {
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
      >
        <Outlet />
      </motion.div>
    </AnimatePresence>
  );
};

export default Z_PageTransition;
