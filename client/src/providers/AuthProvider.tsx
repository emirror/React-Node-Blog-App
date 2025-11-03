import React, { useEffect, useState } from "react";
import request, { requestWithoutAuth } from "../tools/request";
import { setToken, getToken, removeToken } from "../utils/token";
import AuthContext from "../contexts/AuthContext";
import type { User } from "../contexts/AuthContext";

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  const login = async (data: { username: string; password: string }): Promise<void> => {

    setLoading(true);
    const { data: responseData } = await requestWithoutAuth.post("/login", data);
    setToken(responseData.token);
    if (responseData.id && responseData.username) {
      setUser({
        id: responseData.id,
        username: responseData.username,
        role: responseData.role || "USER",
      });
      setIsLoggedIn(true);
      setLoading(false);

    }

  }


  const register = async (data: { username: string; password: string }): Promise<void> => {
    const { data: responseData } = await requestWithoutAuth.post("/register", data);
    await login(data);
    // After registration, automatically log in the new user
  }

  const logout = (): void => {
    setIsLoggedIn(false);
    setUser(null);
    removeToken();
  }

  const getUser = async (): Promise<void> => {
    setLoading(true);
    try {
      const { data: responseData } = await request.post("/user");
      console.log(responseData);

    } catch (error) {
      console.error("Failed to fetch user data:", error);
      return;
    } finally {
      setLoading(false);
    }

  }

  useEffect(() => {
    getToken() ? getUser() : setLoading(false);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        login,
        register,
        user,
        loading,
        isLoggedIn,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

