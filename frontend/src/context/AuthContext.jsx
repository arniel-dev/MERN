import { jwtDecode } from "jwt-decode";
import React, { createContext } from "react";
import { useCookies } from "react-cookie";

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext();

// eslint-disable-next-line react/prop-types
export const AuthProvider = ({ children }) => {
  const [cookies, setCookie, removeCookie] = useCookies(["token"]);
  const token = cookies?.token || null;

  const login = (userToken) => {
    const decoded = jwtDecode(userToken);
    const date = new Date(decoded.exp * 1000);
    setCookie("token", userToken, {
      path: "/",
      expires: date,
    });
  };
  const logout = () => {
    removeCookie("token");
  };
  const isAuthenticated = !!token;
  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
