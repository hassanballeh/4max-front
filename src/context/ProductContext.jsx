// src/context/AuthContext.js
import { createContext, useContext, useState, useEffect } from "react";
// import { getUsername as fetchUsername } from "../back/auth";
const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  return (
    <AuthContext.Provider
      value={{ login, loginAdmin, logout, token, adminToken }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook
export const useAuth = () => useContext(ProductContext);
