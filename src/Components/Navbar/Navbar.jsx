import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
import { FaBars, FaTimes } from "react-icons/fa";
import {
  HiOutlineShoppingBag,
  HiOutlineHeart,
  HiOutlineLogout,
} from "react-icons/hi";
import { useAuth } from "../../context/AuthContext";
import { logout, getUserInfo } from "../../back/auth"; // example import

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { token, logout: logoutUser } = useAuth();
  const [loadingUsername, setLoadingUsername] = useState(false);
  const [username, setUsername] = useState("");
  const toggleMenu = () => setIsOpen(!isOpen);

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
      <div className="max-w-7xl mx-auto flex items-center justify-between flex-wrap px-4 md:px-8 lg:px-12 py-4">
        <div className="flex-shrink-0">
          <NavLink to="/" onClick={() => setIsOpen(false)}>
            <h3 className="text-[2rem] md:text-[2.5rem] text-[#484848] uppercase font-bold">
              4max
            </h3>
          </NavLink>
        </div>

        <div className="md:hidden">
          <button
            onClick={toggleMenu}
            className="text-[#484848] focus:outline-none cursor-pointer"
            aria-label="Toggle menu"
          >
            {isOpen ? <FaTimes size="1.8rem" /> : <FaBars size="1.8rem" />}
          </button>
        </div>

        <nav
          className={`w-full md:w-auto md:flex md:items-center md:gap-8 mt-4 md:mt-0 transition-all duration-300 ease-in-out
            ${isOpen ? "block" : "hidden"} md:block`}
        >
          <NavLink
            to="/"
            onClick={() => setIsOpen(false)}
            className="block md:inline-block text-base text-[#484848] capitalize hover:text-black transition py-2 md:py-0"
          >
            Home
          </NavLink>

          <HashLink
            smooth
            to="/#new-arrivals"
            onClick={() => setIsOpen(false)}
            className="block md:inline-block text-base text-[#484848] capitalize hover:text-black transition py-2 md:py-0"
          >
            New Arrival
          </HashLink>

          <HashLink
            smooth
            to="/products"
            onClick={() => setIsOpen(false)}
            className="block md:inline-block text-base text-[#484848] capitalize hover:text-black transition py-2 md:py-0"
          >
            Products
          </HashLink>

          <HashLink
            smooth
            to="/#contact"
            onClick={() => setIsOpen(false)}
            className="block md:inline-block text-base text-[#484848] capitalize hover:text-black transition py-2 md:py-0"
          >
            Contact
          </HashLink>

          <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4 mt-4 md:mt-0">
            {token ? (
              <>
                <span className="text-base text-[#484848]">{username}</span>

                {/* Favorites Icon */}
                <NavLink
                  to="/favorites"
                  onClick={() => setIsOpen(false)}
                  className="text-[#484848] hover:text-red-500 transition text-xl"
                  aria-label="Favorites"
                >
                  <HiOutlineHeart />
                </NavLink>

                {/* Shopping Basket Icon */}
                <NavLink
                  to="/basket"
                  onClick={() => setIsOpen(false)}
                  className="text-[#484848] hover:text-black transition text-xl"
                  aria-label="Shopping Basket"
                >
                  <HiOutlineShoppingBag />
                </NavLink>

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
                  className="text-base text-[#484848] capitalize hover:text-black transition block text-left md:text-left"
                >
                  Sign In
                </NavLink>

                <NavLink
                  to="/register"
                  onClick={() => setIsOpen(false)}
                  className={`block text-left md:inline-block capitalize text-lg rounded-lg
      py-3
      transition
      ${
        isOpen
          ? "bg-transparent text-[#484848] hover:text-black px-0"
          : "bg-black text-white hover:text-[#999999] px-4"
      }`}
                >
                  Sign Up
                </NavLink>
              </>
            )}
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Navbar;
