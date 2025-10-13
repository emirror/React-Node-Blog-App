import { ConfigProvider, Layout } from "antd"
import HomePage from "./pages"
import Menu from "./Components/Menu";

function App() {
  const { Header, Content, Footer } = Layout;
  return (
    <>
      <ConfigProvider  theme={{
      token: {
        colorPrimary: '#00b96b',
      },
    }}>
        <Layout>
          <Header>
            <Menu />
          </Header>
          <Content>Content</Content>
          <Footer>Footer</Footer>
        </Layout>
        <HomePage />
      </ConfigProvider>

    </>
  )
}

export default App;
