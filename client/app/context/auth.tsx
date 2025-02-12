import { createContext, useContext } from "react";

const AuthContext = createContext({
  login: () => {},
  logout: () => {},
});

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const login = async (token: string) => {
    localStorage.setItem("auth_token", token);
  };

  const logout = () => {
    localStorage.removeItem("auth_token");
  };

  const value = { login, logout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
