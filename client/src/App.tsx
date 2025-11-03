
import { Layout } from "antd";
import Menu from "./Components/Menu";
import useAuth from "./hooks/useAuth";
import { Navigate, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProtectedRoute from "./Components/ProtectedRoute";
import ArticleList from "./pages/ArticleList";

function App() {
  const { Header, Content, Footer } = Layout;
  const { isLoggedIn, loading } = useAuth();

  if (loading) {
    return null;
  }
  return (
    <>

      <Layout className="tw">
        {isLoggedIn && (
          <Header
            style={{
              backgroundColor: "#000080",
              padding: "0 50px",
              display: "flex",
              alignItems: "center",
            }}
          >
            <Menu />
          </Header>
        )}
        <Content>
          <Routes>
            <Route
              path="/login"
              element={isLoggedIn ? <Navigate to="/articles" replace /> : <Login />}
            />
            <Route
              path="/register"
              element={isLoggedIn ? <Navigate to="/articles" replace /> : <Register />}
            />
            <Route path="/" element={isLoggedIn ? <Navigate to="/articles" replace /> : <Navigate to="/login" replace />} />
            <Route
              path="/articles"
              element={
                <ProtectedRoute>
                  <ArticleList />
                </ProtectedRoute>
              }
            />
          </Routes>
        </Content>
        <Footer>Footer</Footer>
      </Layout>

    </>
  )
}

export default App;
