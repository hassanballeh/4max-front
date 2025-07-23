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
    <div className='w-full bg-white py-[70px]'>
            <div className="lg:container mx-auto">
                <div className="flex items-center justify-between gap-10">
                    {/* image wrapper */}
                    <div className='max-w-[940px] w-full min-h-[1077px] h-full'>
                        <img className='w-full h-full object-cover' src="bannerPhoto/photo_2_2025-07-16_23-09-20.jpg" alt="login image" />
                    </div>

          {/* content wrapper */}
          <div className="max-w-[628px] w-full h-auto">
            <h3 className="text-6xl text-[#484848] font-normal uppercase mb-9">4max</h3>
            <h4 className="text-3xl font-black font-normal capitalize flex items-center mb-14">
              sign up to <span className="uppercase">&nbsp;4max</span></h4>

            <form
              onSubmit={handleSubmit}
              className="w-full h-auto flex flex-col gap-4.5 items-center">
              {/* name box */}
              <div className="w-full h-[47px] border-b-[2px] border-[#9d9d9d]">
                <input
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full h-full border-none outline-0"
                  type="text"
                  placeholder="Your Name!..."
                  required
                />
              </div>

              {/* email box */}
              <div className="w-full h-[47px] border-b-[2px] border-[#9d9d9d]">
                <input
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full h-full border-none outline-0"
                  type="email"
                  placeholder="Enter your email..."
                  required
                />
              </div>

              {/* password box */}
              <div className="w-full h-[47px] border-b-[2px] border-[#9d9d9d]">
                <input
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full h-full border-none outline-0"
                  type="password"
                  placeholder="Enter your password..."
                  required
                />
              </div>

              {/* submit button */}
              <div className="w-full h-auto flex items-center justify-center">
                <button
                  type="submit"
                  className="max-w-[575px] w-full h-[60px] bg-black rounded-lg text-white text-xl font-poppins
                   font-semibold capitalize flex items-center justify-center cursor-pointer mt-6">
                  Sign Up
                </button>
              </div>
            </form>

            <div className="w-full h-auto flex items-center justify-center mt-8 gap-4.5">
              <p className="max-w-[575px] w-full text-black flex items-center gap-3 justify-center">
                Already have an account?
                <Link to="/login" className="text-lg font-poppins font-normal capitalize flex items-center
                justify-center cursor-pointer text-[#5p86e5] underline">Login</Link></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
