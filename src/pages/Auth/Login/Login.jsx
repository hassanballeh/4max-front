import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import { loginUser, getUserInfo } from "../../../back/auth";
const Login = () => {
  const { login: authLogin, userInfoFun } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);
    try {
      const res = await loginUser(email, password);
      authLogin(res.access_token);
      navigate("/");
    } catch (err) {
      if (err.message == 403) {
        navigate("/confirmationCode", {
          state: {
            email: email,
            password: password,
            username: localStorage.getItem("username"),
          },
        });
      }
      console.log("sadas", err.message);
      setError("Invalid email or password");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4">
      <div className="w-full max-w-3xl border border-black rounded-xl shadow-md p-6 sm:p-10 bg-white">
        {/* Title */}
        <h4 className="text-2xl sm:text-3xl font-bold capitalize text-center mb-12">
          Sign in to <span className="uppercase">4max</span>
        </h4>
        {error && (
          <p className="text-red-600 my-4 text-center font-semibold">{error}</p>
        )}
        {/* Form */}
        <form className="w-full flex flex-col gap-5" onSubmit={handleSubmit}>
          {/* Email input */}
          <div className="w-full h-[47px] border-b-2 border-[#9d9d9d]">
            <input
              className="w-full h-full border-none outline-none text-base"
              type="email"
              placeholder="Enter your email..."
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* Password input */}
          <div className="w-full h-[47px] border-b-2 border-[#9d9d9d]">
            <input
              className="w-full h-full border-none outline-none text-base"
              type="password"
              placeholder="Enter your password..."
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {/* Submit button */}
          <div className="w-full flex justify-center">
            <button
              type="submit"
              className="max-w-[750px] w-full h-[55px] bg-black text-white text-lg sm:text-xl font-semibold capitalize rounded-lg mt-6 cursor-pointer"
            >
              {isLoading ? "Signing In ..." : "Sign In"}
            </button>
          </div>
        </form>

        {/* Register Link */}
        <div className="w-full flex justify-center mt-8">
          <p className="text-center text-black text-sm sm:text-base">
            You don’t have an account?{" "}
            <Link to="/Register" className=" underline font-medium">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
