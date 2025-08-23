import React from 'react';
import { Link } from 'react-router';

const Admin = () => {
    return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4">
      <div className="w-full max-w-3xl border border-black rounded-xl shadow-md p-6 sm:p-10 bg-white">
        {/* Title */}
        <h4 className="text-2xl sm:text-3xl font-bold capitalize text-center mb-12">
          Hello Admin, please sign in here
        </h4>

        {/* Form */}
        <form className="w-full flex flex-col gap-5">
          {/* Email input */}
          <div className="w-full h-[47px] border-b-2 border-[#9d9d9d]">
            <input
              type="email"
              placeholder="Enter your email..."
              required
              className="w-full h-full border-none outline-none text-base"
            />
          </div>

          {/* Password input */}
          <div className="w-full h-[47px] border-b-2 border-[#9d9d9d]">
            <input
              type="password"
              placeholder="Enter your password..."
              required
              className="w-full h-full border-none outline-none text-base"
            />
          </div>

          {/* Submit button */}
          <div className="w-full flex justify-center">
            <button
              type="submit"
              className="max-w-[750px] w-full h-[55px] bg-black text-white text-lg sm:text-xl font-semibold capitalize rounded-lg mt-6 cursor-pointer"
            >
              Sign In
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Admin;