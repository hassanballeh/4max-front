import React from "react";
import Banner from "../../Components/Banner/Banner";
import NewArrival from "../../Components/NewArrival/NewArrival";
import Contact from "../../Components/Contact/Contact"

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
			
			<div>
				<Contact />
			</div>
		</div>
	);
};

export default Home;
