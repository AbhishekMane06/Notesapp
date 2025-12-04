import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/auth/register`,
        { name, email, password }
      );
      if (response.data.success) {
        toast.success("Account created, please login");
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Signup failed");
    }
  };
  return (
    <div className="w-screen min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0f172a] via-[#0b1222] to-[#0a0f1a] px-4 py-12">
      <div className="w-full max-w-md bg-white/10 backdrop-blur-2xl border border-white/20 rounded-2xl shadow-xl p-8">
        <h2 className="text-3xl font-extrabold text-center text-white mb-6 tracking-tight">
          Create account
        </h2>
        <p className="text-center text-sm text-white/70 mb-6">
          Start capturing ideas
        </p>

        <form onSubmit={handleSubmit}>
          {/* Name */}
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-white/80 font-medium mb-2"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              placeholder="Your full name"
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-white/6 text-white placeholder:text-white/60 border border-white/12 focus:outline-none focus:ring-2 focus:ring-emerald-400/40 transition shadow-sm"
              required
            />
          </div>

          {/* Email */}
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-white/80 font-medium mb-2"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@company.com"
              className="w-full px-4 py-3 rounded-xl bg-white/6 text-white placeholder:text-white/60 border border-white/12 focus:outline-none focus:ring-2 focus:ring-emerald-400/40 transition shadow-sm"
              required
            />
          </div>

          {/* Password */}
          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-white/80 font-medium mb-2"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              onChange={(e) => setPassword(e.target.value)}
              placeholder="*********"
              className="w-full px-4 py-3 rounded-xl bg-white/6 text-white placeholder:text-white/60 border border-white/12 focus:outline-none focus:ring-2 focus:ring-emerald-400/40 transition shadow-sm"
              required
            />
          </div>

          {/* Signup Button */}
          <button
            type="submit"
            className="w-full py-3 rounded-xl font-semibold text-slate-900 bg-gradient-to-r from-emerald-400 to-teal-500 shadow-xl hover:scale-[1.02] transition-all duration-200"
          >
            Create account
          </button>

          {/* Login Prompt */}
          <p className="text-center text-sm mt-5 text-white/80">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-emerald-400 font-semibold hover:underline"
            >
              Log in
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;
