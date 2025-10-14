// src/components/common/Z_HoverLineBox.jsx
import React, { useState } from "react";

const Z_FancyHoverBox = ({
  children,
  lineColor = "#ff4d4f",
  lineHeight = 4,
  borderRadius = 16,
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
        transition: `transform ${duration}ms ease`,
        transform: hovered ? `scale(${hoverScale})` : "scale(1)",
        ...style,
      }}
    >
      {/* 子元素区域 */}
      <div style={{ position: "relative", zIndex: 1 }}>
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
          borderRadius: lineHeight / 2,
          transition: `width ${duration}ms ease`,
          zIndex: 2,
        }}
      />
    </div>
  );
};

export default Z_FancyHoverBox
