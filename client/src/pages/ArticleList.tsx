import { useState } from "react";
import { Table, Button, Space, Image, Typography, Spin, Popconfirm } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { PlusOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { useArticles, useDeleteArticle } from "../hooks/useArticles";
import type { Article } from "../hooks/useArticles";
import useAuth from "../hooks/useAuth";
import { handleSuccess } from "../utils/errorHandler";


export default function ArticleList() {
  const [page, setPage] = useState(1);
  const { data, isLoading } = useArticles(page);
  const deleteArticle = useDeleteArticle();
  const { user } = useAuth();
  const navigate = useNavigate();
  const { Title } = Typography;

  const canEdit = user?.role === "WRITER" || user?.role === "MODERATOR" || user?.role === "ADMIN";


  const columns = [
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      width: 100,
      render: (image: string | null) => {
        if (!image) {
          return (
            <div className="w-20 h-15 bg-gray-200 rounded flex items-center justify-center text-gray-400">
              No Image
            </div>
          );
        }
        const baseURL = import.meta.env.VITE_BASE_URL || "http://localhost:3000";
        const imageUrl = image.startsWith("http") ? image : `${baseURL}/${image}`;
        return (
          <Image src={imageUrl} alt="Article" width={80} height={60} className="object-cover rounded" />
        );
      },
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      render: (title: string, record: Article) => (
        <Link to={`/articles/${record.id}`} className="text-blue-600 hover:underline">
          {title}
        </Link>
      ),
    },
    {
      title: "Content",
      dataIndex: "content",
      key: "content",
      ellipsis: true,
      render: (content: string) => (
        <span className="text-gray-700">{content?.substring(0, 100)}...</span>
      ),
    },
    {
      title: "Author",
      dataIndex: "user",
      key: "author",
      width: 150,
      render: (user: Article["user"]) => (
        <span className="text-gray-600">{user?.username || "Unknown"}</span>
      ),
    },
    ...(canEdit
      ? [
        {
          title: "Actions",
          key: "actions",
          width: 300,
          render: (_: any, record: Article) => (
            <Space>
              <Button
                type="link"
                icon={<EditOutlined />}
                onClick={() => navigate(`/articles/${record.id}/edit`)}
              >
                Edit
              </Button>
              {user?.role === "ADMIN" && (
                <Popconfirm
                  title="Delete Article"
                  description={`Are you sure to delete ${record.title} ?`}
                  onConfirm={async () => {
                    await deleteArticle.mutateAsync(record.id);
                    handleSuccess("Article deleted successfully");
                  }}
                  okText="Yes"
                  cancelText="No"
                >
                  <Button
                    type="link"
                    danger
                    icon={<DeleteOutlined />}
                    loading={deleteArticle.isPending}
                  >
                    Delete
                  </Button>
                </Popconfirm>

              )}
            </Space>
          ),
        },
      ]
      : []),
  ];

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <Title level={2} style={{ color: "#FFA500", margin: 0 }}>
          Articles
        </Title>
        {canEdit && (
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => navigate("/articles/create")}
            size="large"
          >
            Create Article
          </Button>
        )}
      </div>

      <Spin spinning={isLoading}>
        <Table
          columns={columns}
          dataSource={data?.articles || []}
          rowKey="id"
          pagination={{
            current: page,
            total: data?.totals || 0,
            pageSize: data?.limit || 10,
            onChange: setPage,
            showSizeChanger: false,
          }}
          className="bg-white rounded-lg shadow"
        />
      </Spin>
    </div>
  );
}

