import React from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom'; 
import { FaUser, FaHeart } from "react-icons/fa";
import { TiShoppingCart } from "react-icons/ti";

const Navbar = () => {
    const location = useLocation();

    const isHomePage = location?.pathname === '/';

    return (
        <div className="flex items-center justify-between py-4">
            
    <div className="logo_wrapper">
        <Link to="/">
            <h3 className='text-[3.5rem] text-[#484848] uppercase font-normal px-25'>4max</h3>
        </Link>
    </div>



        <nav className='flex items-center gap-10 px-25'>
            <NavLink to="/" className="text-base text-[#484848] capitalize font-normal">Home</NavLink>
            <NavLink to="/newarrival" className="text-base text-[#484848] capitalize font-normal">New Arrival</NavLink>
            <NavLink to="/offers" className="text-base text-[#484848] capitalize font-normal">Offers</NavLink>
            <NavLink to="/offers" className="text-base text-[#484848] capitalize font-normal">our</NavLink>
        <NavLink to="/login" className='text-base text-[#484848] capitalize font-normal'>Sign In</NavLink>
                <NavLink to="/register" className='text-base capitalize font-normal px-5 py-2.5 bg-black text-white rounded-lg'>
                    Sign Up
                </NavLink>
        </nav>


            {/* // <>
            //     <Link to="/profile" className='cursor-pointer'>
            //         <FaUser size="1.5rem" color="#484848" />
            //     </Link>
            //     <Link to="/wishlist" className='cursor-pointer'>
            //         <FaHeart size="1.5rem" color="#484848" />
            //     </Link>
            //     <Link to="/cart" className='cursor-pointer'>
            //         <TiShoppingCart size="1.5rem" color="#484848" />
            //     </Link>
            // </> */}
        
    </div>

    );
};

export default Navbar;
