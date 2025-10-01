import React, { useState, useEffect } from "react";
import { DownOutlined } from "@ant-design/icons"; 
import { Image, Typography, Carousel, Card } from "antd";

import "./Z_Background.css";

const { Paragraph, Title } = Typography

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

const printerSpeed = 1000 / 6;
const pauseTime = 2000;

const Z_Background = () => {
  const [textIndex, setTextIndex] = useState(0); // 当前是哪一句话
  const [displayText, setDisplayText] = useState(""); // 打印中的文字

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
        }, pauseTime);
      }
    }, printerSpeed);

    return () => clearInterval(interval);
  }, [textIndex]);

  return (
    <Card>
      {/* 轮播背景 */}
      <Carousel autoplay effect="fade" className="z-bg-carousel">
        {images.map((src, index) => (
          <div key={index} className="z-bg-slide">
            <Image
              preview={false}
              src={src}
              alt={`background-${index}`}
              className="z-bg-img"
            />
          </div>
        ))}
      </Carousel>

      {/* 文字层 & 箭头提示 */}
      <div className="z-bg-overlay">
        <Title level={3}>
          {displayText}
          <span className="cursor">_</span>
        </Title>
        <div className="z-bg-arrow">
          <DownOutlined />
        </div>
      </div>
    </Card>
  );
};

export default Z_Background;
