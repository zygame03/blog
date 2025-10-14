import { Layout, Menu, Button } from "antd";
import { useNavigate } from "react-router-dom";
import { useAppTheme } from "../../contexts/ThemeContext";
import { Sun, Moon } from "lucide-react";

const { Header } = Layout;

const items = [
  { label: "主页", key: "/home" },
  { label: "文章", key: "/article" },
  { label: "分类", key: "/classic" },
  { label: "关于", key: "/about" },
  { label: "链接", key: "/links" },
];

const Z_Header = () => {
  const navigate = useNavigate();
  const { themeMode, toggleTheme } = useAppTheme();

  const getSelectedKey = () => {
    const path = location.pathname;
    const match = items.find((item) => path.startsWith(item.key));
    return match ? match.key : "/";
  };

  return (
    <Header
      style={{
        padding: "0 24px",
        position: "fixed",
        top: 0,
        width: "100%",
        zIndex: 1000,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        transition: "background 0.3s",
      }}
    >
      <Menu
        mode="horizontal"
        onClick={(e) => navigate(e.key)}
        selectedKeys={[getSelectedKey()]}
        items={items}
        theme={themeMode}
        style={{ flex: 1, justifyContent: "center" }}
      />

      <Button
        shape="circle"
        size="large"
        type="text"
        onClick={toggleTheme}
        icon={
          themeMode === "light" ? (
            <Moon size={24} />
          ) : (
            <Sun size={24} color="#ffcc00" />
          )
        }
        style={{
          color: themeMode === "light" ? "#000" : "#fff",
          transition: "all 0.3s",
        }}
        onMouseEnter={(e) =>
          (e.currentTarget.style.backgroundColor =
            themeMode === "light" ? "#f0f0f0" : "#333")
        }
        onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
      />

      {/* <Button
        type="text"
        onClick={toggleTheme}
        icon={
          themeMode === "light" ? (
            <Moon size={18} style={{ transition: "transform 0.4s" }} />
          ) : (
            <Sun size={18} style={{ transition: "transform 0.4s" }} />
          )
        }
        style={{
          display: "flex",
          alignItems: "center",
          gap: 6,
          color: themeMode === "light" ? "#000" : "#fff",
          transition: "all 0.3s",
        }}
        onMouseEnter={(e) =>
          (e.currentTarget.style.transform = "rotate(-5deg) scale(1.05)")
        }
        onMouseLeave={(e) =>
          (e.currentTarget.style.transform = "rotate(0deg) scale(1)")
        }
      >
        {themeMode === "light" ? "暗色模式" : "亮色模式"}
      </Button> */}
    </Header>
  );
};

export default Z_Header;
