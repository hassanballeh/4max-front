import api from "../api";
import apiSecurity from "../../apiSecurity";
import apiToken from "../../apiToken";
export const createOrder = async (data) => {
  try {
    const res = await apiToken.post("/api/orders", data);

    return res.data;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};
export const getUserOrders = async () => {
  try {
    const res = await apiToken.get("/api/orders/getUserOrders");

    return res.data;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};
export const getAllOrders = async () => {
  try {
    const res = await apiToken.get("/api/orders");

    return res.data;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};
export const deleteOrder = async (id) => {
  try {
    const res = await apiToken.delete(`/api/orders/${id}`);

    return res.data;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};
export const createOrderByAdmin = async (data) => {
  try {
    const res = await apiToken.post(`/api/orders/createOrderByAdmin`, data);

    return res.data;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};
