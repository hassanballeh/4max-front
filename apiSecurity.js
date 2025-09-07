// src/api/api.js
import axios from "axios";

const apiSecurity = axios.create({
  // baseURL: "http://localhost:8080", // Change to your backend
  baseURL: "https://clothes-back-production.up.railway.app", // Change to your backend
  withCredentials: true,
  // withCredentials: true, // optional if using cookies
  headers: {
    "Content-Type": "application/json",
  },
});

apiSecurity.interceptors.request.use((config) => {
  return config;
});

export default apiSecurity;
