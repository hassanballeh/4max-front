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


    {isHomePage ? (
        <nav className='flex items-center gap-6'>
            <NavLink to="/products" className="text-base text-[#484848] capitalize font-normal">Products</NavLink>
            <h1>|</h1>
            <NavLink to="/newarrival" className="text-base text-[#484848] capitalize font-normal">New Arrival</NavLink>
            <h1>|</h1>
            <NavLink to="/offers" className="text-base text-[#484848] capitalize font-normal">Offers</NavLink>
        </nav>
    ) : (
        <nav className='flex items-center gap-6'>
            <NavLink to="/products" className="text-base text-[#484848] capitalize font-normal">Summer</NavLink>
            <h1>|</h1>
            <NavLink to="/products" className="text-base text-[#484848] capitalize font-normal">Winter</NavLink>
        </nav>
    )}

    <div className='flex items-center gap-4 px-25'>
        {isHomePage ? (
            <>
                <NavLink to="/login" className='text-base text-[#484848] capitalize font-normal'>Sign In</NavLink>
                <NavLink to="/register" className='text-base capitalize font-normal px-5 py-2.5 bg-black text-white rounded-lg'>
                    Sign Up
                </NavLink>
            </>
        ) : (
            <>
                <Link to="/profile" className='cursor-pointer'>
                    <FaUser size="1.5rem" color="#484848" />
                </Link>
                <Link to="/wishlist" className='cursor-pointer'>
                    <FaHeart size="1.5rem" color="#484848" />
                </Link>
                <Link to="/cart" className='cursor-pointer'>
                    <TiShoppingCart size="1.5rem" color="#484848" />
                </Link>
            </>
        )}
    </div>
</div>

    );
};

export default Navbar;
