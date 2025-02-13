import { createContext, useContext, useEffect } from "react";
import { apiClient } from "../lib/actions";

interface AuthContextType {
  login: (token: string) => void;
  logout: () => void;
}

interface AuthProviderProps {
  children: React.ReactNode;
}

const AuthContext = createContext<AuthContextType>({
  login: () => {},
  logout: () => {},
});

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const token = localStorage.getItem("auth_token");
  useEffect(() => {
    if (token) {
      apiClient("", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    }
  }, []);

  const login = async (token: string) => {
    localStorage.setItem("auth_token", token);
  };

  const logout = () => {
    localStorage.removeItem("auth_token");
  };

  const value = { login, logout, token };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
