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
    const { data: response } = await requestWithoutAuth.post("/login", data);
    setToken(response.token);
    if (response.id && response.username) {
      setUser({
        id: response.id,
        username: response.username,
        role: response.role || "USER",
      });
      setIsLoggedIn(true);
      setLoading(false);

    }

  }


  const register = async (data: { username: string; password: string }): Promise<void> => {
    const { data: response } = await requestWithoutAuth.post("/register", data);
    console.log(response);
    
    await login(data);
  }

  const logout = (): void => {
    setIsLoggedIn(false);
    setUser(null);
    removeToken();
  }

  const getUser = async (): Promise<void> => {
    setLoading(true);
    try {
      const { data: response } = await request.post("/user");
      
      if (response.id && response.username) {
        setUser({
          id: response.id,
          username: response.username,
          role: response.role || "USER",
        });
        
        setIsLoggedIn(true);
      }
    } catch (error) {
      console.error("Failed to fetch user data:", error);
      setIsLoggedIn(false);
      setUser(null);
      removeToken();
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

