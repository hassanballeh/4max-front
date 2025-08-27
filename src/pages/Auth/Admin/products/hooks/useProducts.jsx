import { useState } from "react";

const useProducts = () => {
  const [products, setProducts] = useState([
    {
      id: 1,
      name: "Summer Collection T-Shirt",
      description: "Comfortable cotton t-shirt perfect for summer",
      season: "Summer 2024",
      variants: [
        { price: 29.99, stock: 50, color: "Blue", size: "M", base64Images: [] },
        { price: 29.99, stock: 30, color: "Red", size: "L", base64Images: [] },
      ],
    },
  ]);

  const createProduct = (product) => {
    setProducts([...products, { id: Date.now(), ...product }]);
  };

  const updateProduct = (id, data) => {
    setProducts(products.map((p) => (p.id === id ? { ...p, ...data } : p)));
  };

  const deleteProduct = (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      setProducts(products.filter((p) => p.id !== id));
    }
  };

  return { products, createProduct, updateProduct, deleteProduct };
};

export default useProducts;
