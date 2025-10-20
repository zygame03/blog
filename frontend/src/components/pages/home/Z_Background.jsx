import React, { useState, useEffect } from "react";
import { Typography, Carousel } from "antd";
import "./Z_Background.css";

const { Title } = Typography;

export default function Z_Hero({
  images = [
    "/background/bg_0.png",
    "/background/bg_1.png",
    "/background/bg_2.png",
  ],
  texts = ["欢迎来到 ZYGame 的博客", "记录技术，分享思考", "Hello, world"],
  heightPercent = 60, // 背景高度占屏比例
}) {
  const [textIndex, setTextIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");

  const printerSpeed = 1000 / 6;
  const pauseTime = 2000;

  // 打字机动画
  useEffect(() => {
    let i = 0;
    setDisplayText("");
    const interval = setInterval(() => {
      if (i < texts[textIndex].length) {
        setDisplayText((prev) => prev + texts[textIndex].charAt(i));
        i++;
      } else {
        clearInterval(interval);
        setTimeout(() => {
          setTextIndex((prev) => (prev + 1) % texts.length);
        }, pauseTime);
      }
    }, printerSpeed);

    return () => clearInterval(interval);
  }, [textIndex, texts]);

  return (
    <div className="z-hero" style={{ height: `${heightPercent}vh` }}>
      {/* 背景轮播 */}
      <Carousel autoplay effect="fade" className="z-hero-carousel">
        {images.map((src, idx) => (
          <div className="z-hero-slide" key={idx}>
            <img src={src} alt={`bg-${idx}`} className="z-hero-img" />
          </div>
        ))}
      </Carousel>

      {/* 打字机文字层 */}
      <div className="z-hero-overlay">
        <Title level={1} className="z-typewriter">
          {displayText}
          <span className="cursor">_</span>
        </Title>
      </div>
    </div>
  );
}
