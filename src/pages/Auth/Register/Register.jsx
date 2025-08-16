import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { name, email, password } = formData;

    if (!name || !email || !password) {
      alert('Please fill in all fields');
      return;
    }

    navigate('/confirmation-code'); 
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4 pt-12">
      
      <div className="w-full max-w-3xl border border-black rounded-xl shadow-md p-6 sm:p-10 bg-white">
        <h4 className="text-2xl sm:text-3xl font-bold capitalize text-center mb-10">
          Sign up to <span className="uppercase">4max</span>
        </h4>

        <form
          onSubmit={handleSubmit}
          className="w-full flex flex-col gap-5"
        >
          
          <div className="w-full h-[47px] border-b-2 border-[#9d9d9d]">
            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              type="text"
              placeholder="Your name..."
              required
              className="w-full h-full border-none outline-none text-base"
            />
          </div>

          
          <div className="w-full h-[47px] border-b-2 border-[#9d9d9d]">
            <input
              name="email"
              value={formData.email}
              onChange={handleChange}
              type="email"
              placeholder="Enter your email..."
              required
              className="w-full h-full border-none outline-none text-base"
            />
          </div>

          
          <div className="w-full h-[47px] border-b-2 border-[#9d9d9d]">
            <input
              name="password"
              value={formData.password}
              onChange={handleChange}
              type="password"
              placeholder="Enter your password..."
              required
              className="w-full h-full border-none outline-none text-base"
            />
          </div>

          
          <div className="w-full flex justify-center">
            <button
              type="submit"
              className="max-w-[750px] w-full h-[55px] bg-black text-white text-lg sm:text-xl font-semibold rounded-lg mt-6"
            >
              Sign Up
            </button>
          </div>
        </form>

       
        <div className="w-full flex justify-center mt-8">
          <p className="text-center text-black text-sm sm:text-base">
            Already have an account?{' '}
            <Link
              to="/login"
              className=" underline font-medium"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
