import { useEffect, useState } from "react";
import { Form, Input, Button, Card, Typography, Upload, message, Space } from "antd";
import { useArticle } from "../hooks/useArticles";
import request from "../tools/request";
import { useNavigate } from "react-router-dom";
import { UploadOutlined, ArrowLeftOutlined } from "@ant-design/icons";
import { useCreateArticle, useUpdateArticle } from "../hooks/useArticles";
import { handleSuccess } from "../utils/errorHandler";
import { useParams } from "react-router-dom";

const { Title } = Typography;
const { TextArea } = Input;

export default function CreateArticle() {
  const { id } = useParams<{ id: string }>();
  const isEdit = !!id;
  const { data: article } = useArticle(Number(id));
  const navigate = useNavigate();
  const createArticle = useCreateArticle();
  const updateArticle = useUpdateArticle();
  const [imageUrl, setImageUrl] = useState<string>("");
  const [form] = Form.useForm();

  // Set initial values when editing
  useEffect(() => {

    if (article && article.image) {
      setImageUrl(article.image);
    }

  }, []);

  const initialValues = isEdit && article ? {
    title: article.title,
    content: article.content,
    image: article.image,
  } : {};

  const handleUpload = async (file: File) => {
    try {
      const formData = new FormData();
      formData.append("file", file);

      const { data } = await request.post("/api/file/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      const imagePath = data;
      const baseURL = import.meta.env.VITE_API_URL || "http://localhost:5000";
      const fullUrl = `${baseURL}/${imagePath}`;
      setImageUrl(fullUrl);
      message.success("Image uploaded successfully");
      return false;
    } catch (error) {
      return false;
    }
  };

  async function onFinish(values: { title: string; content: string }) {
    try {
      const articleData = {
        title: values.title,
        content: values.content,
        ...(imageUrl && { image: imageUrl }),
      };

      if (isEdit) {
        await updateArticle.mutateAsync({
          id: Number(id),
          ...articleData,
        });
        handleSuccess("Article updated successfully");
      } else {
        await createArticle.mutateAsync(articleData);
        handleSuccess("Article created successfully");
      }

      navigate("/articles");
    } catch (error) {
      // Error handled by interceptor
    }
  }

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <Button
        icon={<ArrowLeftOutlined />}
        onClick={() => navigate("/articles")}
        className="mb-4"
      >
        Back to Articles
      </Button>

      <Card className="shadow-lg">
        <Title level={2} style={{ color: "#FFA500", marginBottom: 24 }}>
          {isEdit ? "Edit Article" : "Create New Article"}
        </Title>

        <Form
          form={form}
          name="article"
          onFinish={onFinish}
          layout="vertical"
          size="middle"
          initialValues={initialValues}
        >
          <Form.Item
            label="Title"
            name="title"
            rules={[{ required: true, message: "Please input the article title!" }]}
          >
            <Input placeholder="Enter article title" />
          </Form.Item>

          <Form.Item
            label="Content"
            name="content"
            rules={[{ required: true, message: "Please input the article content!" }]}
          >
            <TextArea
              rows={10}
              placeholder="Enter article content"
              showCount
            />
          </Form.Item>

          <Form.Item label="Image">
            <Upload
              beforeUpload={handleUpload}
              showUploadList={false}
              accept="image/*"
            >
              <Button icon={<UploadOutlined />}>Upload Image</Button>
            </Upload>
            {imageUrl && (
              <div className="mt-4">
                <img
                  src={imageUrl}
                  alt="Preview"
                  className="max-w-xs rounded-lg border"
                />
              </div>
            )}
          </Form.Item>

          <Form.Item>
            <Space>
              <Button
                type="primary"
                htmlType="submit"
                loading={createArticle.isPending || updateArticle.isPending}
              >
                {isEdit ? "Update Article" : "Create Article"}
              </Button>
              <Button onClick={() => navigate("/articles")}>Cancel</Button>
            </Space>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
}

