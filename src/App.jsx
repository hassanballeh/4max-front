import "./App.css";
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router";
import Footer from "./Components/Footer/Footer";
import Home from "./pages/Home/Home";
import HomeNavbar from "./Components/HomeNavbar/HomeNavbar";
import Navbar from "./Components/Navbar/Navbar";
import Register from "./pages/Auth/Register/Register";
import Login from "./pages/Auth/Login/Login";
import ConfirmationCode from "./pages/Auth/ConfirmationCode/ConfirmationCode";
import Admin from "./pages/Auth/Admin/Admin";
import NewArrival from "./Components/NewArrival/NewArrival";
import Products from "./pages/Products";


function App() {

	return (
		<>
		<BrowserRouter>	
		<Navbar/>	
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/products" element={<Products />} />

				<Route path="/newarrival" element={<NewArrival />} />
				<Route path="/login" element={<Login />} />
				<Route path="/register" element={<Register />} />
				<Route path="/confirmation-code" element={<ConfirmationCode />} />
				<Route path="/admin" element={<Admin />} />
			</Routes>

			{/* footer component */}
			<Footer />
			</BrowserRouter>
		</>
	)
}

export default App;
