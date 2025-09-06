// src/api/api.js
import axios from "axios";

const api = axios.create({
  baseURL: "https:clothes-back-production.up.railway.app/api", // Change to your backend
  // withCredentials: true, // optional if using cookies
  headers: {
    "Content-Type": "application/json",
    // withCredentials: true,
  },
});

api.interceptors.request.use((config) => {
  return config;
});

export default api;
