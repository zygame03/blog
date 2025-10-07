// src/components/common/Z_Background.jsx
import React from "react";
import "./Z_Background.css";

const Z_Background = ({ children }) => {
  return (
    <div className="z-background">
      <div className="z-background-overlay" />
      <div className="z-background-content">{children}</div>
    </div>
  );
};

export default Z_Background;
