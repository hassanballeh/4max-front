import React from 'react';
import { NavLink } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link'; 
import { FaUser, FaHeart } from "react-icons/fa";
import { TiShoppingCart } from "react-icons/ti";

const Navbar = () => {
  return (
    <div className="flex items-center justify-between px-25">
      {/* Logo */}
      <div className="logo_wrapper">
        <NavLink to="/">
          <h3 className='text-[3.5rem] text-[#484848] uppercase font-normal'>4max</h3>
        </NavLink>
      </div>

      {/* Navigation */}
      <nav className='flex items-center gap-10'>
        <NavLink to="/" className="text-base text-[#484848] capitalize font-normal hover:text-black transition">
          Home
        </NavLink>

        <HashLink smooth to="/#new-arrivals" className="text-base text-[#484848] capitalize font-normal hover:text-black transition">
          New Arrival
        </HashLink>

        <HashLink smooth to="/#products" className="text-base text-[#484848] capitalize font-normal hover:text-black transition">
          Products
        </HashLink>

        <HashLink smooth to="/#contact" className="text-base text-[#484848] capitalize font-normal hover:text-black transition">
          Contact
        </HashLink>

        <NavLink to="/login" className='text-base text-[#484848] capitalize font-normal hover:text-black transition'>
          Sign In
        </NavLink>

        <NavLink to="/register" className='text-base capitalize font-normal px-5 py-2.5 bg-black text-white rounded-lg hover:text-[#999999] transition'>
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



