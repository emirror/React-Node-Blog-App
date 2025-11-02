import { Menu as AntMenu, Button, Space } from "antd";
import type { MenuProps } from "antd";
import { useNavigate, useLocation, Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { LogoutOutlined } from "@ant-design/icons";

type MenuItem = Required<MenuProps>["items"][number];

export default function Menu() {
  const navigate = useNavigate();
  const location = useLocation();
  const { isLoggedIn, user, logout } = useAuth();

  const items: MenuItem[] = [
    {
      label: <Link to="/articles">Articles</Link>,
      key: "/articles",
    },
  ];

  const handleMenuClick = ({ key }: { key: string }) => {
    navigate(key);
  };

  const handleLogout = () => {
    logout && logout();
    navigate("/login");
  };

  if (!isLoggedIn) {
    return null;
  }

  return (
    <div className="flex justify-between items-center w-full">
      <div className="flex-1">
        <AntMenu
          mode="horizontal"
          items={items}
          selectedKeys={[location.pathname]}
          onClick={handleMenuClick}
          style={{
            lineHeight: "64px",
            borderBottom: "none",
            backgroundColor: "transparent",
          }}
        />
      </div>
      <Space className="px-4">
        <span className="text-white">{user?.username}</span>
        <span className="text-white opacity-75">({user?.role})</span>
        <Button
          type="text"
          icon={<LogoutOutlined />}
          onClick={handleLogout}
          className="!text-white hover:!text-orange-300"
        >
          Logout
        </Button>
      </Space>
    </div>
  );
}
