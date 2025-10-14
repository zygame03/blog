import { useState, useEffect } from "react";
import axios from "axios";
import { Card, Typography } from "antd";

import { useAppTheme } from "../../../../contexts/ThemeContext";
import Z_SkillIconMap from "../../../common/Z_SkillIconMap";
import { API_BASE } from "../../../../api";

const { Title } = Typography;

const Z_SkillsCard = () => {
  const [skills, setSkills] = useState([]);
  const { themeMode } = useAppTheme(); // 🌙 取当前主题

  useEffect(() => {
    axios
      .get(`${API_BASE}/api/user/skills`)
      .then((res) => {
        const data = res.data?.data || "";
        const arr = data.replace(/^\[|\]$/g, "").split(",");
        setSkills(arr.filter(Boolean));
      })
      .catch((err) => {
        console.error("获取 Skills 失败", err);
      });
  }, []);

  // 🎨 不同主题的样式
  const isDark = themeMode === "dark";
  const skillBg = isDark ? "rgba(255, 255, 255, 0.1)" : "#f7f7f7";
  const textColor = isDark ? "#f0f0f0" : "#222";

  return (
    <Card
      title= "技能"
    >
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: 12,
        }}
      >
        {skills && skills.length > 0 ? (
          skills.map((skill, idx) => {
            const iconClass = Z_SkillIconMap[skill] || "devicon-devicon-plain";
            return (
              <div
                key={idx}
                style={{
                  display: "flex",
                  alignItems: "center",
                  background: skillBg,
                  padding: "6px 6px",
                  borderRadius: "26px",
                  transition: "all 0.3s ease",
                }}
              >
                <span
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: 40,
                    height: 40,
                    borderRadius: "50%",
                    marginRight: "6px",
                    fontSize: 28,
                  }}
                >
                  <i className={`${iconClass} colored`} />
                </span>
                <span 
                  style={{ 
                    marginRight: "10px",
                    color: textColor, 
                    fontSize: 16 
                  }}
                >
                  {skill}
                </span>
              </div>
            );
          })
        ) : (
          <span style={{ color: textColor, opacity: 0.7 }}>暂无技能</span>
        )}
      </div>
    </Card>
  );
};

export default Z_SkillsCard;
