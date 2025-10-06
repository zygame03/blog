// src/components/common/Z_HoverLineBox.jsx
import React, { useState } from "react";

const Z_HoverLineBox = ({
  children,
  lineColor = "#ff4d4f", // 默认红色线条
  lineHeight = 2, // 线条高度
  borderRadius = 10,
  hoverScale = 1.01,
  duration = 300,
  style = {},
}) => {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: "relative",
        borderRadius,
        transition: `all ${duration}ms ease`,
        transform: hovered ? `scale(${hoverScale})` : "scale(1)",
        boxShadow: hovered
          ? "0 6px 20px rgba(0,0,0,0.15)"
          : "0 2px 8px rgba(0,0,0,0.08)",
        ...style,
      }}
    >
      {/* 子元素区域 */}
      <div
        style={{
          background: "#fff",
          borderRadius,
          overflow: "hidden",
          position: "relative",
          zIndex: 1,
        }}
      >
        {children}
      </div>

      {/* 底部展开线条 */}
      <div
        style={{
          position: "absolute",
          left: 0,
          bottom: 0,
          height: lineHeight,
          width: hovered ? "100%" : "0%",
          backgroundColor: lineColor,
          borderBottomLeftRadius: borderRadius,
          borderBottomRightRadius: borderRadius,
          transition: `width ${duration}ms ease`,
          zIndex: 2,
        }}
      />
    </div>
  );
};

export default Z_HoverLineBox;
