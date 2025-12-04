import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../context/ContextProvider";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/auth/login`,
        { email, password }
      );
      if (response.data.success) {
        login(response.data.user);
        localStorage.setItem("token", response.data.token);
        toast.success("Login successful");
        navigate("/");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="w-screen h-screen flex items-center justify-center bg-gradient-to-br from-[#0f172a] via-[#0b1222] to-[#0a0f1a] px-4">
      {/* Card wrapper */}
      <div className="w-full max-w-md bg-white/10 backdrop-blur-2xl border border-white/20 rounded-2xl shadow-xl p-8">
        {/* Heading */}
        <h2 className="text-3xl font-extrabold text-center text-white mb-6 tracking-wide">
          Login
        </h2>

        <form onSubmit={handleSubmit}>
          {/* Email */}
          <div className="mb-5">
            <label
              htmlFor="email"
              className="block text-white/80 font-medium mb-1"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter Email"
              className="w-full px-4 py-3 rounded-xl bg-white/10 text-white placeholder:text-white/60 border border-white/20
                       focus:outline-none focus:ring-2 focus:ring-emerald-400/40 transition shadow-sm"
              required
            />
          </div>

          {/* Password */}
          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-white/80 font-medium mb-1"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter Password"
              className="w-full px-4 py-3 rounded-xl bg-white/10 text-white placeholder:text-white/60 border border-white/20
                       focus:outline-none focus:ring-2 focus:ring-emerald-400/40 transition shadow-sm"
              required
            />
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full py-3 rounded-xl font-semibold text-slate-900 bg-gradient-to-r 
                       from-emerald-400 to-teal-500 shadow-xl hover:scale-[1.02] transition-all duration-200"
          >
            Login
          </button>

          {/* Signup Prompt */}
          <p className="text-center text-sm mt-5 text-white/80">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="text-emerald-400 font-semibold hover:underline"
            >
              Register
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
