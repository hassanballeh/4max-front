// src/api/api.js
import axios from "axios";

const apiSecurity = axios.create({
  baseURL: "http://localhost:8080", // Change to your backend
  withCredentials: true,
  // withCredentials: true, // optional if using cookies
  headers: {
    "Content-Type": "application/json",
  },
});

apiSecurity.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default apiSecurity;
