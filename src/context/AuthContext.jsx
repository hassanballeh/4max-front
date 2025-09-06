// src/context/AuthContext.js
import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [adminToken, setAdminToken] = useState(
    localStorage.getItem("adminToken") || null
  );

  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
    } else {
      localStorage.removeItem("token");
    }
  }, [token]);
  useEffect(() => {
    if (adminToken) {
      localStorage.setItem("adminToken", adminToken);
    } else {
      localStorage.removeItem("adminToken");
    }
  }, [adminToken]);

  const login = (token) => {
    setToken(token);
  };

  const loginAdmin = (token) => {
    setAdminToken(token);
  };

  const logout = () => {
    setToken(null);
    setAdminToken(null);
    if (localStorage.getItem("visibleCount") != null)
      localStorage.removeItem("visibleCount");
    if (localStorage.getItem("visibleCountF") != null)
      localStorage.removeItem("visibleCountF");
    localStorage.removeItem("shopping_cart");
  };

  return (
    <AuthContext.Provider
      value={{ login, loginAdmin, logout, token, adminToken }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook
export const useAuth = () => useContext(AuthContext);
