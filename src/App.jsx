import "./App.css";
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Banner from "./Components/Banner/Banner";
import Footer from "./Components/Footer/Footer";
import Home from "./pages/Home/Home";
import Navbar from "./Components/Navbar/Navbar";
import Register from "./pages/Auth/Register/Register";
import Login from "./pages/Auth/Login/Login";
import ConfirmationCode from "./pages/Auth/ConfirmationCode/ConfirmationCode";
import AdminLogin from "./pages/Auth/Admin/AdminLogin";
import Products from "./Components/Products/Products";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import FavouriteList from "./pages/FavouriteList";
import Checkout from "./pages/Checkout";
import AdminPage from "./pages/Auth/Admin/AdminPage";
import { AuthProvider } from "./context/AuthContext";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/product-details" element={<ProductDetails />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/favouriteList" element={<FavouriteList />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/confirmation-code" element={<ConfirmationCode />} />
          <Route path="/adminLogin" element={<AdminLogin />} />
          <Route path="/adminPage" element={<AdminPage />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;