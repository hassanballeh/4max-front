import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
import { FaBars, FaTimes } from "react-icons/fa";
import {
  HiOutlineShoppingBag,
  HiOutlineHeart,
  HiOutlineLogout,
} from "react-icons/hi";
import { useAuth } from "../../context/AuthContext";
import { logout, getUserInfo } from "../../back/auth";
import { ShoppingBagIcon } from "@heroicons/react/24/outline";
import { useCart } from "../../context/CartContext";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { token, logout: logoutUser } = useAuth();
  const [loadingUsername, setLoadingUsername] = useState(false);
  const [username, setUsername] = useState("");
  const toggleMenu = () => setIsOpen(!isOpen);
  const { totalItems } = useCart();
  const navigate = useNavigate();

  // Fetch username if authenticated and not already set
  useEffect(() => {
    const fetchUser = async () => {
      if (token) {
        try {
          setLoadingUsername(true);
          const res = await getUserInfo();
          const name =
            res.data.username[0].toUpperCase() + res.data.username.slice(1);
          setUsername(name);
        } catch (err) {
          console.error("Failed to get username:", err);
        } finally {
          setLoadingUsername(false);
        }
      }
    };
    fetchUser();
  }, [token]);

  const handleLogout = async () => {
    await logout();
    logoutUser();
    setUsername(null);
  };

  // Full page loader when fetching username
  if (token && loadingUsername) {
    return (
      <div className="fixed inset-0 bg-white flex items-center justify-center z-[9999]">
        <div className="w-12 h-12 border-4 border-gray-300 border-t-black rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="w-full border-b border-[#d9d9d9] bg-white fixed top-0 left-0 z-50">
      {/* Desktop Layout */}
      <div className="hidden md:block">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-4 md:px-8 lg:px-12">
          {/* Logo */}
          <div className="flex-shrink-0">
            <NavLink to="/">
              <img
                className="w-[7rem] h-[6rem] cursor-pointer"
                src="logo-transparent-svg.svg"
                alt=""
              />
            </NavLink>
          </div>

          {/* Navigation Links - Centered */}
          <nav className="flex items-center justify-center flex-1 mx-8">
            <div className="flex items-center gap-8">
              <NavLink
                to="/"
                onClick={() => setIsOpen(false)}
                className="text-base text-[#484848] capitalize hover:text-black transition"
              >
                Home
              </NavLink>

              <HashLink
                smooth
                to="/#new-arrivals"
                onClick={() => setIsOpen(false)}
                className="text-base text-[#484848] capitalize hover:text-black transition"
              >
                New Arrival
              </HashLink>

              <HashLink
                smooth
                to="/products"
                onClick={() => setIsOpen(false)}
                className="text-base text-[#484848] capitalize hover:text-black transition"
              >
                Products
              </HashLink>

              <HashLink
                smooth
                to="/#contact"
                onClick={() => setIsOpen(false)}
                className="text-base text-[#484848] capitalize hover:text-black transition"
              >
                Contact
              </HashLink>
            </div>
          </nav>

          {/* Right side - User actions */}
          <div className="flex items-center gap-4 flex-shrink-0">
            {token ? (
              <>
                {/* Orders link with username */}
                <NavLink
                  to="/orders"
                  onClick={() => setIsOpen(false)}
                  className="text-base text-[#484848] hover:text-black transition capitalize whitespace-nowrap"
                >
                  {username}'s Orders
                </NavLink>

                {/* Favorites Icon */}
                <NavLink
                  to="/favoriteList"
                  onClick={() => setIsOpen(false)}
                  className="text-[#484848] hover:text-red-500 transition text-xl"
                  aria-label="Favorites"
                >
                  <HiOutlineHeart />
                </NavLink>

                {/* Cart Icon */}
                <button
                  onClick={() => navigate("/cart")}
                  className="relative p-2 text-[#484848] hover:text-gray-500 cursor-pointer"
                >
                  <ShoppingBagIcon className="h-6 w-6" aria-hidden="true" />
                  {totalItems > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {totalItems > 99 ? "99+" : totalItems}
                    </span>
                  )}
                </button>

                {/* Logout Icon */}
                <button
                  onClick={handleLogout}
                  className="text-[#484848] hover:text-red-600 transition text-xl cursor-pointer"
                  aria-label="Logout"
                >
                  <HiOutlineLogout />
                </button>
              </>
            ) : (
              <>
                <NavLink
                  to="/login"
                  onClick={() => setIsOpen(false)}
                  className="text-base text-[#484848] capitalize hover:text-black transition"
                >
                  Sign In
                </NavLink>

                <NavLink
                  to="/register"
                  onClick={() => setIsOpen(false)}
                  className="bg-black text-white hover:text-[#999999] px-4 py-3 capitalize text-lg rounded-lg transition"
                >
                  Sign Up
                </NavLink>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Layout */}
      <div className="md:hidden">
        <div className="flex items-center justify-between px-4 ">
          {/* Logo */}
          <div className="">
            <NavLink to="/">
              {" "}
              <img
                className="w-[7rem] h-[6rem] cursor-pointer"
                src="logo-transparent-svg.svg"
                alt=""
              />
            </NavLink>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={toggleMenu}
            className="text-[#484848] focus:outline-none cursor-pointer"
            aria-label="Toggle menu"
          >
            {isOpen ? <FaTimes size="1.8rem" /> : <FaBars size="1.8rem" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="border-t border-[#d9d9d9] bg-white">
            <div className="px-4 py-4 space-y-3">
              {/* Navigation Links */}
              <NavLink
                to="/"
                onClick={() => setIsOpen(false)}
                className="block text-base text-[#484848] capitalize hover:text-black transition py-2"
              >
                Home
              </NavLink>

              <HashLink
                smooth
                to="/#new-arrivals"
                onClick={() => setIsOpen(false)}
                className="block text-base text-[#484848] capitalize hover:text-black transition py-2"
              >
                New Arrival
              </HashLink>

              <HashLink
                smooth
                to="/products"
                onClick={() => setIsOpen(false)}
                className="block text-base text-[#484848] capitalize hover:text-black transition py-2"
              >
                Products
              </HashLink>

              <HashLink
                smooth
                to="/#contact"
                onClick={() => setIsOpen(false)}
                className="block text-base text-[#484848] capitalize hover:text-black transition py-2"
              >
                Contact
              </HashLink>

              {/* User Actions */}
              <div className="border-t border-[#d9d9d9] pt-3 mt-3">
                {token ? (
                  <>
                    <NavLink
                      to="/orders"
                      onClick={() => setIsOpen(false)}
                      className="block text-base text-[#484848] hover:text-black transition capitalize py-2"
                    >
                      {username}'s Orders
                    </NavLink>

                    <div className="flex items-center gap-4 py-2">
                      <NavLink
                        to="/favoriteList"
                        onClick={() => setIsOpen(false)}
                        className="text-[#484848] hover:text-red-500 transition text-xl flex items-center gap-2"
                        aria-label="Favorites"
                      >
                        <HiOutlineHeart />
                        <span className="text-base">Favorites</span>
                      </NavLink>

                      <button
                        onClick={() => {
                          navigate("/cart");
                          setIsOpen(false);
                        }}
                        className="relative text-[#484848] hover:text-gray-500 cursor-pointer flex items-center gap-2"
                      >
                        <ShoppingBagIcon
                          className="h-6 w-6"
                          aria-hidden="true"
                        />
                        <span className="text-base">Cart</span>
                        {totalItems > 0 && (
                          <span className="bg-red-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                            {totalItems > 99 ? "99+" : totalItems}
                          </span>
                        )}
                      </button>
                    </div>

                    <button
                      onClick={() => {
                        handleLogout();
                        setIsOpen(false);
                      }}
                      className="text-[#484848] hover:text-red-600 transition text-base cursor-pointer flex items-center gap-2 py-2"
                      aria-label="Logout"
                    >
                      <HiOutlineLogout />
                      <span>Logout</span>
                    </button>
                  </>
                ) : (
                  <>
                    <NavLink
                      to="/login"
                      onClick={() => setIsOpen(false)}
                      className="block text-base text-[#484848] capitalize hover:text-black transition py-2"
                    >
                      Sign In
                    </NavLink>

                    <NavLink
                      to="/register"
                      onClick={() => setIsOpen(false)}
                      className="block bg-black text-white hover:text-[#999999] px-4 py-3 capitalize text-lg rounded-lg transition mt-2"
                    >
                      Sign Up
                    </NavLink>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
