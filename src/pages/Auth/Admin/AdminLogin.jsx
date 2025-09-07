import { useState } from "react";
import { useNavigate } from "react-router-dom"; // redirect after login
import { loginAdmin } from "../../../back/auth";
import { useAuth } from "../../../context/AuthContext";
const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { loginAdmin: login } = useAuth();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      setLoading(true);
      const res = await loginAdmin({ email, password });
      login(res.access_token);

      // Redirect to admin dashboard
      navigate("/admin");
    } catch (err) {
      console.error("Admin login failed:", err);
      setError(err.response?.data?.message || "Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4">
      <div className="w-full max-w-3xl border border-black rounded-xl shadow-md p-6 sm:p-10 bg-white">
        <h4 className="text-2xl sm:text-3xl font-bold capitalize text-center mb-12">
          Hello Admin, please sign in here
        </h4>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        <form className="w-full flex flex-col gap-5" onSubmit={handleSubmit}>
          <div className="w-full h-[47px] border-b-2 border-[#9d9d9d]">
            <input
              type="email"
              placeholder="Enter your email..."
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full h-full border-none outline-none text-base"
            />
          </div>
          <div className="w-full h-[47px] border-b-2 border-[#9d9d9d]">
            <input
              type="password"
              placeholder="Enter your password..."
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full h-full border-none outline-none text-base"
            />
          </div>
          <div className="w-full flex justify-center">
            <button
              type="submit"
              disabled={loading}
              className={`max-w-[750px] w-full h-[55px] text-lg sm:text-xl font-semibold capitalize rounded-lg mt-6 cursor-pointer ${
                loading
                  ? "bg-gray-400 text-white"
                  : "bg-black text-white hover:bg-gray-800"
              }`}
            >
              {loading ? "Signing In..." : "Sign In"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
