// src/api/api.js
import axios from "axios";

const api = axios.create({
  baseURL: "http://13.60.254.214:8080", // Change to your backend
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
