import { ConfigProvider } from "antd";
import type { ThemeConfig } from "antd";
import { BrowserRouter } from "react-router-dom";
// import AuthProvider from "./AuthProvider";
import QueryProvider from "./QueryProvider";
import AuthProvider from "./AuthProvider";
import {StyleProvider} from '@ant-design/cssinjs'
const theme: ThemeConfig = {
  token: {
    colorPrimary: "#FFA500",
    colorInfo: "#000080",
  },
};

export default function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <StyleProvider layer hashPriority="high">
    <ConfigProvider theme={theme}>
      <BrowserRouter>
        <QueryProvider>
          <AuthProvider>
            {children}
          </AuthProvider>
        </QueryProvider>
      </BrowserRouter>
    </ConfigProvider>
    </StyleProvider>
  );
}

