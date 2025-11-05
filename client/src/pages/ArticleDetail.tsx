import { Spin, Typography, Image, Card, Space } from "antd";
import { useParams, useNavigate } from "react-router-dom";
import { useArticle } from "../hooks/useArticles";
import useAuth from "../hooks/useAuth";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { Button } from "antd";

const { Title, Paragraph } = Typography;

export default function ArticleDetail() {
  const { id } = useParams<{ id: string }>();
  const { data: article, isLoading } = useArticle(Number(id));
  const { user } = useAuth();
  const navigate = useNavigate();

  const canEdit = user?.role === "WRITER" || user?.role === "MODERATOR" || user?.role === "ADMIN";

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Spin size="large" />
      </div>
    );
  }

  if (!article) {
    return (
      <div className="p-6">
        <Card>
          <Title level={3}>Article not found</Title>
        </Card>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <Button
        icon={<ArrowLeftOutlined />}
        onClick={() => navigate("/articles")}
        className="mb-4"
      >
        Back to Articles
      </Button>

      <Card className="shadow-lg">
        <Space direction="vertical" size="large" className="w-full">
          <Title level={2} style={{ color: "#FFA500", marginBottom: 8 }}>
            {article.title}
          </Title>
          {article.image && (
            <Image
              src={article.image}
              alt={article.title}
              className="w-full rounded-lg"
              preview={false}
            />
          )}

          <div>

            <Space>
              <span className="text-gray-600">
                By <strong>{article.user?.username || "Unknown"}</strong>
              </span>
              {canEdit && (
                <Button
                  type="primary"
                  onClick={() => navigate(`/articles/${article.id}/edit`)}
                >
                  Edit Article
                </Button>
              )}
            </Space>
          </div>

          <Paragraph className="text-lg leading-relaxed text-gray-700 whitespace-pre-line">
            {article.content}
          </Paragraph>

          {article.createdAt && (
            <div className="text-sm text-gray-500">
              Published: {new Date(article.createdAt).toLocaleDateString()}
            </div>
          )}
        </Space>
      </Card>
    </div>
  );
}

