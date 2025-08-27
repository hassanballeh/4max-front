import api from "../api";

export const createProduct = async (product) => {
  try {
    const res = await api.post("/api/products", product);
    return res.data;
  } catch (error) {
    const errorMessage =
      error.response?.data?.message ||
      error.response?.data ||
      error.message ||
      "Failed to create product";
    throw new Error(errorMessage);
  }
};

export const getAllProducts = async () => {
  try {
    const res = await api.get("/api/products");
    return res.data;
  } catch (error) {
    const errorMessage =
      error.response?.data?.message ||
      error.response?.data ||
      error.message ||
      "Failed to fetch products";
    throw new Error(errorMessage);
  }
};

export const getProductById = async (id) => {
  try {
    const res = await api.get(`/api/products/${id}`);
    return res.data; // Changed from return res to return res.data
  } catch (error) {
    console.log("er", error);
    const errorMessage =
      error.response?.data?.message ||
      error.response?.data ||
      error.message ||
      "Failed to fetch product";
    throw new Error(errorMessage);
  }
};

export const updateProduct = async (productData, id) => {
  try {
    const res = await api.put(`/api/products/${id}`, productData);
    return res.data; // Changed from return res to return res.data
  } catch (error) {
    const errorMessage =
      error.response?.data?.message ||
      error.response?.data ||
      error.message ||
      "Failed to update product";
    throw new Error(errorMessage);
  }
};

export const deleteProduct = async (id) => {
  try {
    const res = await api.delete(`/api/products/${id}`);
    return res.data; // Changed from return res to return res.data
  } catch (error) {
    const errorMessage =
      error.response?.data?.message ||
      error.response?.data ||
      error.message ||
      "Failed to delete product";
    throw new Error(errorMessage);
  }
};
