import React from "react";
import { Link } from "react-router-dom";

const Banner = () => {
  return (
    <div className="w-full border-b border-[#d9d9d9] pt-[90px] pb-[100px] bg-white mt-15 px-0 lg:px-38">
      <div className="max-w-[1440px] mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center lg:items-stretch gap-6">
          {/* Left Image */}
          <div className="w-full lg:w-1/3 min-h-[300px] lg:min-h-[756px] rounded-lg overflow-hidden flex items-end justify-center">
            <img
              className="w-full h-full object-cover"
              src="bannerPhoto/photo_2025-07-30_20-34-09.jpg"
              alt="Left banner"
            />
          </div>

          {/* Middle Content */}
          <div className="w-full lg:w-1/3 flex flex-col items-center lg:items-center justify-between gap-6">
            {/* Text */}
            <div className="text-center">
              <h3 className="text-[#484848] text-[50px] md:text-[70px] font-poppins font-medium uppercase leading-tight">
                ultimate <br />
                <span className="text-white text-stroke text-[100px]">
                  sale
                </span>
              </h3>
              <p className="text-[#484848] text-lg md:text-xl font-normal font-poppins uppercase mt-7">
                new collection
              </p>
            </div>

            {/* Button */}
            <Link
              to="/products"
              className="mx-auto text-white font-poppins font-medium px-6 py-2 bg-black rounded text-sm uppercase mb-8 inline-block"
            >
              Shop now
            </Link>

            {/* Bottom image */}
            <div className="w-full min-h-[150px] rounded overflow-hidden">
              <img
                className="w-full h-full object-cover"
                src="bannerPhoto/photo_2_2025-07-30_19-02-44.jpg"
                alt="Bottom banner"
              />
            </div>
          </div>

          {/* Right Image */}
          <div className="w-full lg:w-1/3 min-h-[300px] lg:min-h-[756px] rounded-lg overflow-hidden flex items-end justify-center">
            <img
              className="w-full h-full object-cover"
              src="instagramPhoto/photo_7_2025-07-30_16-40-44.jpg"
              alt="Right banner"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
