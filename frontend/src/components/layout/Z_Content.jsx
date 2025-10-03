// src/components/layout/Z_Content.jsx
import React from "react";
import { Layout } from "antd";

const { Content } = Layout;

const Z_Content = ({ children }) => {
  return (
    <Content
      style={{
        display: "flex",
        justifyContent: "center",
        // textAlign: 'center',
        marginTop: "80px",
        padding: "0 16px",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "1350px",
        }}
      >
        {children}
      </div>
    </Content>
  );
};

export default Z_Content;
