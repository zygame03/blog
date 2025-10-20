// src/components/pages/article/Z_ArticlePagination.jsx
import React, { useState } from "react";
import { Row, Col, Pagination, Spin, Empty, Typography, Divider, message } from "antd";
import Z_ArticleInfoCard from "../../common/Z_ArticleInfoCard";
import { useArticles } from "../../../hooks/useArticles";

const { Title } = Typography;
const PAGE_SIZE = 10;

const Z_ArticlePagination = () => {
  const [current, setCurrent] = useState(1);
  const { articles, grouped, years, total, loading, error, refetch } = useArticles(current, PAGE_SIZE);

  const handlePageChange = (page) => {
    setCurrent(page);
    refetch(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (error) {
    message.error("文章加载失败");
  }

  if (loading) {
    return (
      <div style={{ textAlign: "center" }}>
        <Spin size="large" />
      </div>
    );
  }

  if (years.length === 0) {
    return <Empty description="暂无文章" />;
  }

  return (
    <>
      {years.map((year) => (
        <div key={year} style={{ marginBottom: 32 }}>
          <Divider orientation="left">
            <Title level={3} style={{ margin: 0 }}>
              {year}
            </Title>
          </Divider>
          <Row gutter={[24, 24]}>
            {grouped[year].map((item) => (
              <Col xl={24} md={24} xs={24} key={item.id}>
                <Z_ArticleInfoCard item={item} />
              </Col>
            ))}
          </Row>
        </div>
      ))}

      <div style={{ marginTop: 24, textAlign: "center" }}>
        <Pagination
          current={current}
          pageSize={PAGE_SIZE}
          total={total}
          onChange={handlePageChange}
        />
      </div>
    </>
  );
};

export default Z_ArticlePagination;