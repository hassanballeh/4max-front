import React from 'react';
import { Link , NavLink } from 'react-router-dom';

const HomeNavbar = () => {
	return (
		<div className='w-full'>
			<div className="lg:container w-full mx-auto px-25">
				<div className="flex items-center justify-between">

					{/* logo wrapper */}
					    <div className="logo_wrapper">
						<Link to={"/"}><h3 className='text-[3.5rem]
						text-[#484848] uppercase font-normal'>4max</h3></Link>
						</div>

					{/* navbar */}
						<nav className='flex items-center gap-6 '>
						<NavLink to={'/products'} className='text-base text-[#484848] capitalize font-normal'>Products</NavLink><h1>|</h1>
						<NavLink to={'/newarrival'} className='text-base text-[#484848] capitalize font-normal font-poppins'>New Arrival</NavLink><h1>|</h1>
						<NavLink to={'/offers'} className='text-base text-[#484848] capitalize font-normal font-poppins'>Offers</NavLink>
						</nav>

					{/* sign */}
						<div className='flex items-center justify-between gap-3'>
						<NavLink to={'/login'} className='text-base text-[#484848] capitalize font-normal font-poppins'>sign in</NavLink>
						<NavLink to={'/register'} className='text-base text-[#484848] capitalize font-normal font-poppins px-5 py-2.5 bg-black text-white rounded-lg'>sign up</NavLink>
						</div>
					
				</div>
			</div>
		</div>
	);
};

export default HomeNavbar;
