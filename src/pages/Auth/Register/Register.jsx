import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser, registerUser } from "../../../back/auth";
import { useAuth } from "../../../context/AuthContext";
const Register = () => {
  const navigate = useNavigate();
  const { login: authLogin } = useAuth();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);
    try {
      await registerUser(formData);
      const res = await loginUser(email, password);
      authLogin(res.access_token);
      navigate("/");
    } catch (error) {
      console.log("reg", error.message);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4 pt-12">
      <div className="w-full max-w-3xl border border-black rounded-xl shadow-md p-6 sm:p-10 bg-white">
        <h4 className="text-2xl sm:text-3xl font-bold capitalize text-center mb-10">
          Sign up to <span className="uppercase">4max</span>
        </h4>
        {error && (
          <p className="text-red-600 my-4 text-center font-semibold">{error}</p>
        )}
        <form onSubmit={handleSubmit} className="w-full flex flex-col gap-5">
          <div className="w-full h-[47px] border-b-2 border-[#9d9d9d]">
            <input
              name="username"
              value={formData.username}
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
              {isLoading ? "Signing Up ..." : "Sign Up"}
            </button>
          </div>
        </form>

        <div className="w-full flex justify-center mt-8">
          <p className="text-center text-black text-sm sm:text-base">
            Already have an account?{" "}
            <Link to="/login" className=" underline font-medium">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
