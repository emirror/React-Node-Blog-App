import React, { useState } from "react";
import { requestWithoutAuth } from "../tools/request";
import { setToken } from "../utils/token";
import AuthContext from "../contexts/AuthContext";
import type { User } from "../contexts/AuthContext";

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  const login = async (data: { username: string; password: string }): Promise<void> => {


    const { data: responseData } = await requestWithoutAuth.post("/login", data);
    setToken(responseData.token);
    console.log("responseData", responseData);
    
    if (responseData.id && responseData.username) {
      setUser({
        id: responseData.id,
        username: responseData.username,
        role: responseData.role || "USER",
      });
      setIsLoggedIn(true);
    }

  }

  
  const register = async (data: { username: string; password: string }): Promise<void> => {
    const { data: responseData } = await requestWithoutAuth.post("/register", data);
    await login(data);
    // After registration, automatically log in the new user
  }


  return (
    <AuthContext.Provider
      value={{
        login,
        register,
        user,
        loading,
        isLoggedIn,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

