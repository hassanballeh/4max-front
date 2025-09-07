// src/api/auth.js
import api from "../api";
import apiSecurity from "../../apiSecurity";
import apiToken from "../../apiToken";

export const loginUser = async (email, password) => {
  try {
    const res = await apiSecurity.post("/auth/login", { email, password });

    return res.data;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};
export const loginAdmin = async ({ email, password }) => {
  try {
    const res = await apiSecurity.post("/auth/loginAdmin", { email, password });

    return res.data;
  } catch (error) {
    console.log(error);
  }
};
export const registerUser = async (userData) => {
  try {
    const res = await api.post("/auth/register", userData);
    return res;
  } catch (error) {
    console.log(error);
    throw new Error(error.response.data.errorMessage || error.response.data);
  }
};
export const checkCode = async (userData) => {
  try {
    const res = await api.post("/email/checkCode", userData);
    return res;
  } catch (error) {
    console.log(error);
    throw new Error(error.response || error.response.data);
  }
};
export const sendCode = async (userData) => {
  try {
    const res = await api.post("/email/sendCode", userData);
    return res;
  } catch (error) {
    console.log(error);
    throw new Error(error.response || error.response.data);
  }
};
export const getUserInfo = async () => {
  try {
    const res = await apiToken.get("/auth/userInfo");
    return res;
  } catch (error) {
    console.log(error);
    // throw new Error(error.response || error.response.data);
  }
};
export const getAccessToken = async () => {
  try {
    const res = await apiSecurity.post("/auth/refreshToken");
    return res.data;
  } catch (error) {
    // console.log(error);
    throw new Error(error.response || error.response.data);
  }
};
export const logout = async () => {
  try {
    const res = await apiSecurity.post("/auth/logout");

    return res;
  } catch (error) {
    console.log(error);
    // throw new Error(error.response || error.response.data);
  }
};
export const toggleFavoriteProduct = async (id) => {
  try {
    const res = await apiToken.post("/auth/toggleFavoriteProduct", { id });

    return res;
  } catch (error) {
    console.log(error);
    // throw new Error(error.response || error.response.data);
  }
};
