import React from "react";
import HomeNavbar from "../../Components/HomeNavbar/HomeNavbar";
import Banner from "../../Components/Banner/Banner";
import NewArrival from "../../Components/NewArrival/NewArrival";

const Home = () => {
	return (
		<div>
			{/* Home page Navbar */}
			{/*HomeNavbar*/}

			{/* banner component */}
			<div>
				<Banner />
			</div>

			{/* new arrival component */}
			<div>
				<NewArrival />
			</div>
		</div>
	);
};

export default Home;
