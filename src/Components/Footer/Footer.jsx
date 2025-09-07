import React from "react";
import { Link, NavLink } from "react-router";

const Footer = () => {
  return (
    <footer className="w-full bg-white pt-[30px] pb-[20px] border-t border-[#d9d9d9] lg:px-16">
      <div className="max-w-[1440px] mx-auto px-[100px]">
        <div className="flex flex-col md:flex-row items-center justify-between pb-6 gap-4">
          <div className="flex-shrink-0">
            <NavLink to="/">
              {" "}
              <img
                className="w-[7rem] h-[6rem] cursor-pointer"
                src="logo-transparent-svg.svg"
                alt=""
              />
            </NavLink>
          </div>

          <nav className="flex flex-wrap justify-center gap-6 md:gap-[1.5rem]">
            {[
              "support center",
              "invoicing",
              "contact",
              "career",
              "blog",
              "FAQs",
            ].map((label, idx) => (
              <NavLink
                key={idx}
                to="/"
                className="text-base text-[#484848] capitalize font-normal font-poppins"
              >
                {label}
              </NavLink>
            ))}
          </nav>
        </div>
      </div>

      <div className="flex items-center justify-center">
        <p className="text-sm text-[#484848] font-poppins font-normal text-center px-4">
          &copy; 2025 4max. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
