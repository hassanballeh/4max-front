// src/api/auth.js
import api from "../api";

export const loginUser = async (email, password) => {
  try {
    const res = await api.post("/auth/login", { email, password });
    console.log("e: ", res);
    return res.data;
  } catch (error) {
    console.log(error);
  }

  return res.data; // expecting { token, user }
};

export const registerUser = async (userData) => {
  try {
    const res = await api.post("/auth/register", userData);
    return res;
  } catch (error) {
    throw new Error(error.response.data.errorMessage);
  }
};
