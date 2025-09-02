// src/api/api.js
import axios from "axios";
import { getAccessToken } from "./src/back/auth";
import { useAuth } from "./src/context/AuthContext";
const apiToken = axios.create({
  baseURL: "http://localhost:8080", // Change to your backend
  // withCredentials: true, // optional if using cookies
  headers: {
    "Content-Type": "application/json",
    // withCredentials: true,
  },
});

apiToken.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
apiToken.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // if access_token expired
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // Call backend refresh endpoint
        const response = await getAccessToken();

        const res = response;
        console.log("res1:", res);
        const newAccessToken = response.access_token;
        console.log("res in apitoken:", response);
        localStorage.setItem("token", newAccessToken);

        // Save new access token
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return axios(originalRequest);
      } catch (err) {
        localStorage.removeItem("token");
        localStorage.removeItem("adminToken");
        window.location.href = "/";
        return Promise.reject(err);
      }
    }

    return Promise.reject(error);
  }
);

export default apiToken;
