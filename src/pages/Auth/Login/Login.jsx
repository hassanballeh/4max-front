import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import { loginUser } from "../../../back/auth";
const Login = () => {
  const { login: authLogin } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await loginUser(email, password);
      authLogin(res.access_token);
      console.log(res);
      navigate("/"); // redirect after login success
    } catch (err) {
      // console.log(err);
      setError("Invalid email or password");
    }
  };

  return (
    <div className="w-full bg-white py-[70px]">
      <div className="lg:container mx-auto">
        <div className="flex items-center justify-between gap-10">
          {/* image wrapper */}
          <div className="max-w-[940px] w-full min-h-[1077px] h-full">
            <img
              className="rounded w-full h-full object-cover"
              src="bannerPhoto/photo_1_2025-07-30_19-02-44.jpg"
              alt="login image"
            />
          </div>

          {/* content wrapper */}
          <div className="max-w-[628px] w-full h-auto mb-130">
            <h3 className="text-6xl text-[#484848] font-normal uppercase mb-9">
              4max
            </h3>
            <h4 className="text-3xl font-black font-normal capitalize flex items-center mb-14">
              sign in to <span className="uppercase">&nbsp;4max</span>
            </h4>
            <form
              className="w-full h-auto flex flex-col gap-4.5 items-center"
              onSubmit={handleSubmit}
            >
              {/* input box email */}
              <div className="w-full h-[47px] border-b-[2px] border-[#9d9d9d]">
                <input
                  className="w-full h-full border-none outline-0"
                  type="email"
                  placeholder="Enter your email..."
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              {/* input box password */}
              <div className="w-full h-[47px] border-b-[2px] border-[#9d9d9d]">
                <input
                  className="w-full h-full border-none outline-0"
                  type="password"
                  placeholder="Enter your password..."
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <div
                className="w-full h-auto flex items-center justify-center"
                type="submit"
              >
                <button
                  className="max-w-[575px] w-full h-[60px] bg-black rounded-lg
                                text-white text-xl font-poppins font-semibold capitalize flex
                                items-center justify-center cursor-pointer mt-6"
                  type="submit"
                >
                  sign in
                </button>
              </div>
            </form>
            {error && (
              <p className="text-red-600 mt-4 text-center font-semibold">
                {error}
              </p>
            )}
            <div
              className="w-full h-auto flex items-center justify-center mt-8
                            gap-4.5"
            >
              <Link
                to={"/register"}
                className="max-w-[575px] w-full h-[35px] rounded-lg
                                 text-xl font-poppins font-semibold capitalize flex
                                item-center justify-center cursor-pointer border-[2px]"
              >
                register now
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
