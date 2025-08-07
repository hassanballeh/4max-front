import React from "react";
import Banner from "../../Components/Banner/Banner";
import NewArrival from "../../Components/NewArrival/NewArrival";
import Contact from "../../Components/Contact/Contact"
import Products from "../../Components/Products/Products";

const Home = () => {
	return (
		<div>
			{/* Home page Navbar */}

			{/* banner component */}
			<div>
				<Banner />
			</div>

			{/* new arrival component */}
			<div>
				<NewArrival />
			</div>

			{/* Products component */}
			<div>
				<Products />
			</div>

			{/* Contact component */}
			<div>
				<Contact />
			</div>
		</div>
	);
};

export default Home;
