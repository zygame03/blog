// src/components/pages/home/Z_HotArticles.jsx
import { Row, Col, Spin, Empty, message } from "antd";
import Z_ArticleInfoCard from "../../common/Z_ArticleInfoCard";
import { useHotArticles } from "../../../hooks/useHotArticles";

const Z_HotArticles = () => {
  const { hotArticles, loading, error } = useHotArticles();

  if (error) {
    message.error("热门文章加载失败");
  }

  if (loading) {
    return (
      <div style={{ textAlign: "center", padding: "50px" }}>
        <Spin size="large" />
      </div>
    );
  }

  if (hotArticles.length === 0) {
    return <Empty description="暂无热门文章" />;
  }

  return (
    <Row gutter={[16, 16]}>
      {hotArticles.map((item) => (
        <Col xl={24} md={24} xs={24} key={item.id}>
          <Z_ArticleInfoCard item={item} />
        </Col>
      ))}
    </Row>
  );
};

export default Z_HotArticles;