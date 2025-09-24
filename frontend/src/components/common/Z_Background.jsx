import React, { useState, useEffect } from "react";

import "./Z_Background.css";

const images = [
  "/background/bg_0.png",
  "/background/bg_1.png",
  "/background/bg_2.png",
  "/background/bg_3.png",
];

const texts = [
  "欢迎来到 ZYGame 的博客",
  "记录技术，分享思考",
  "Hello, world",
];

const Z_Background = () => {
  const [current, setCurrent] = useState(0);     // 背景索引
  const [textIndex, setTextIndex] = useState(0); // 当前是哪一句话
  const [displayText, setDisplayText] = useState(""); // 打印中的文字
  const [height, setHeight] = useState(40); // vh
  const [opacity, setOpacity] = useState(1);

  // 背景切换
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // 打字机效果
  useEffect(() => {
    let i = 0;
    setDisplayText(""); // 重置文字

    const interval = setInterval(() => {
      if (i < texts[textIndex].length) {
        const char = texts[textIndex].charAt(i);
        setDisplayText((prev) => prev + char);
        i++;
      } else {
        // 打完了，停掉定时器
        clearInterval(interval);
        // 2s 后切换到下一句
        setTimeout(() => {
          setTextIndex((prev) => (prev + 1) % texts.length);
        }, 2000);
      }
    }, 100);

    return () => clearInterval(interval);
  }, [textIndex]);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrollY = window.scrollY;
          // 滚动 300px 内高度从 40vh -> 0vh
          const newHeight = Math.max(0, 40 - (scrollY / 300) * 40);
          setHeight(newHeight);
          setOpacity(newHeight / 40);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className="z-background"
      style={{ height: `${height}vh`, opacity: opacity }}
    >
      {/* 背景层 */}
      {images.map((img, index) => (
        <div
          key={index}
          className={`z-bg-image ${index === current ? "active" : ""}`}
          style={{ backgroundImage: `url(${img})` }}
        />
      ))}

      {/* 文字层 */}
      {height >= 20 && (
        <div className="z-bg-text" style={{ opacity: opacity }}>
          {displayText}
          <span className="cursor">_</span>
        </div>
      )}
    </div>
  );
};

export default Z_Background;
