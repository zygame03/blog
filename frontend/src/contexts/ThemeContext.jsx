import { createContext, useContext, useState, useEffect } from "react";
import { ConfigProvider, theme as antdTheme } from "antd";

const ThemeContext = createContext();
export const useAppTheme = () => useContext(ThemeContext);

export const Z_ThemeProvider = ({ children }) => {
  const [themeMode, setThemeMode] = useState(
    () => localStorage.getItem("theme") || "light"
  );

  const toggleTheme = () => {
    const next = themeMode === "light" ? "dark" : "light";
    setThemeMode(next);
    localStorage.setItem("theme", next);
  };

  // 切换 <body> 的 data-theme，用于全局背景、CSS 动画等
  useEffect(() => {
    document.body.setAttribute("data-theme", themeMode);
  }, [themeMode]);

  // Ant Design 内置的两种算法
  const { defaultAlgorithm, darkAlgorithm } = antdTheme;

  // 根据当前主题选择算法
  const algorithm = themeMode === "dark" ? darkAlgorithm : defaultAlgorithm;

  // 自定义 token（可在不同主题下设置不同值）
  const token = {
    colorPrimary: themeMode === "dark" ? "rgba(255, 91, 88, 1)" : "#fb3236ff",
    colorBgBase: themeMode === "dark" ? "#d6d6d6ff" : "#ffffff",
    colorText: themeMode === "dark" ? "#f0f0f0" : "#151515",
    fontSize: 16,
  };

  // 给 antd 的 Layout、Card 组件设置样式
  const components = {
    // Layout: {
    //   headerBg: "transparent",
    //   bodyBg: "transparent",
    //   footerBg: "transparent",
    //   siderBg: "transparent",
    // },
    // Card: {
    //   boxShadow:
    //     themeMode === "dark"
    //       ? "0 3px 8px rgba(191, 191, 191, 0.3)"
    //       : "0 3px 8px rgba(255, 165, 130, 0.25)",
    //   colorBgContainer:
    //     themeMode === "dark"
    //       ? "rgba(0, 0, 0, 0.85)"
    //       : "rgba(255,255,255,0.25)",
    //   colorBorderSecondary:
    //     themeMode === "dark"
    //       ? "rgba(145, 145, 145, 0.15)"
    //       : "rgba(255,255,255,0.3)",
    //   borderRadiusLG: 16,
    // },
  };

  return (
    <ThemeContext.Provider value={{ themeMode, toggleTheme }}>
      <ConfigProvider theme={{ token, algorithm, components }}>
        {children}
      </ConfigProvider>
    </ThemeContext.Provider>
  );
};
