import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';// 划线、表、任务列表和直接url等的语法扩展
import rehypeRaw from 'rehype-raw'// 解析标签，支持html语法

//高亮的主题，还有很多别的主题，可以自行选择


const Z_ArticleDetail = ({ content }) => {
  return (
    <ReactMarkdown>{ content }</ReactMarkdown>
  );
};

export default Z_ArticleDetail;
