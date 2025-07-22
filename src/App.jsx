import "./App.css";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import Footer from "./Components/Footer/Footer";
import Home from "./pages/Home/Home";
import Register from "./pages/Auth/Register/Register";
import Login from "./pages/Auth/Login/Login";
import ConfirmationCode from "./pages/Auth/ConfirmationCode/ConfirmationCode";
import Admin from "./pages/Auth/Admin/Admin";
import Products from "./Components/Products/Products";
import HomeNavbar from "./Components/Navbar/HomeNavbar";
import DefaultNavbar from "./Components/Navbar/DefaultNavbar";
import NewArrival from "./Components/NewArrival/NewArrival";

const Layout = () => {
	const location = useLocation();
	const isHome = location.pathname === "/";

	return (
		<>
			{isHome ? <HomeNavbar /> : <DefaultNavbar />}

			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/products" element={<Products />} />
				<Route path="/newarrival" element={<NewArrival />} />

				<Route path="/login" element={<Login />} />
				<Route path="/register" element={<Register />} />
				<Route path="/confirmation-code" element={<ConfirmationCode />} />
				<Route path="/admin" element={<Admin />} />
			</Routes>

			<Footer />
		</>
	);
};

function App() {
	return (
		<BrowserRouter>
			<Layout />
		</BrowserRouter>
	);
}

export default App;
