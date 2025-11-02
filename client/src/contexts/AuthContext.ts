import { createContext } from "react";

export interface User {
  id: number;
  username: string;
  role: string;
}

export interface AuthContextType {
  user?: User | null;
  isLoggedIn?: boolean;
  loading?: boolean;
  login?: (data: { username: string; password: string }) => Promise<void>;
  register?: (data: { username: string; password: string }) => Promise<void>;
  logout?: () => void;
  getUser?: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export default AuthContext;

