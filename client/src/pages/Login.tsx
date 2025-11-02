import { Button, Form, Input, Card, Typography } from "antd";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { handleSuccess } from "../utils/errorHandler";

const { Title } = Typography;

export default function Login() {
  const { login, loading } = useAuth();
  const navigate = useNavigate();

  async function onFinish(data: { username: string; password: string }) {

      login && await login(data);
      handleSuccess("Login successful");
      navigate("/articles");
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 to-blue-50 p-4">
      <Card className="w-full max-w-md shadow-lg">
        <Title level={2} className="text-center mb-6" style={{ color: "#FFA500" }}>
          Login
        </Title>
        <Form name="login" onFinish={onFinish} layout="vertical" size="large">
          <Form.Item
            label="Username"
            name="username"
            rules={[{ required: true }]}
          >
            <Input placeholder="Enter your username" />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true }]}
          >
            <Input.Password placeholder="Enter your password" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading} block>
              Login
            </Button>
          </Form.Item>

          <div className="text-center mt-4">
            <span className="text-gray-600">Don't have an account? </span>
            <Link to="/register" className="text-blue-600 hover:underline">
              Register here
            </Link>
          </div>
        </Form>
      </Card>
    </div>
  );
}

