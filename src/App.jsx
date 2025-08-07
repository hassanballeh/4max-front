import "./App.css";
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router";
import Banner from "./Components/Banner/Banner";
import Footer from "./Components/Footer/Footer";
import Home from "./pages/Home/Home";
import Navbar from "./Components/Navbar/Navbar";
import Register from "./pages/Auth/Register/Register";
import Login from "./pages/Auth/Login/Login";
import ConfirmationCode from "./pages/Auth/ConfirmationCode/ConfirmationCode";
import Admin from "./pages/Auth/Admin/Admin";
import Products from "./Components/Products/Products";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import FavouriteList from "./pages/FavouriteList";

function App() {

	return (
		<>
		<BrowserRouter>	
		<Navbar/>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/products" element={<Products />} />
				<Route path="/product-details" element={<ProductDetails />} />
				<Route path="/cart" element={<Cart />} />
				<Route path="/favouriteList" element={<FavouriteList />} />
				
				<Route path="/login" element={<Login />} />
				<Route path="/register" element={<Register />} />
				<Route path="/confirmation-code" element={<ConfirmationCode />} />
				<Route path="/admin" element={<Admin />} />
			</Routes>
			<div className="scroll-smooth">
  <Routes />
  <Footer />
</div>

			</BrowserRouter>
		</>
	)
}

export default App;
