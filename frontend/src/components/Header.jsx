import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/ContextProvider";

const Header = ({ setQuery }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col md:flex-row items-center gap-4 md:gap-0 justify-between py-4">
        {/* Brand */}
        <Link
          to="/"
          className="flex items-center gap-2 text-white no-underline"
        >
          <span className="w-10 h-10 text-2xl flex items-center justify-center rounded-lg bg-gradient-to-br from-emerald-400 to-teal-500 shadow-lg">
            📝
          </span>
          <div>
            <div className="text-lg font-extrabold text-white">NoteApp</div>
            <div className="text-xs text-white/60">Capture ideas fast</div>
          </div>
        </Link>

        {/* Search */}
        <input
          type="text"
          placeholder="Search notes.."
          onChange={(e) => setQuery(e.target.value)}
          className="w-full md:w-1/2 lg:w-2/5 pl-4 pr-4 py-2.5 rounded-xl bg-white/6 text-white placeholder:text-white/60 border border-white/8 focus:outline-none focus:ring-2 focus:ring-emerald-400/40 transition"
        />

        {/* Auth */}
        <div className="flex items-center gap-3">
          {!user ? (
            <>
              <Link
                to="/login"
                className="px-4 py-2 rounded-lg bg-white/10 text-white hover:bg-white/20 transition font-medium"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="px-4 py-2 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-500 text-white hover:from-indigo-600 hover:to-purple-600 transition font-semibold"
              >
                Signup
              </Link>
            </>
          ) : (
            <>
              <div className="flex items-center gap-3 px-3 py-1.5 bg-white/6 rounded-full border border-white/8">
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center text-slate-900 font-bold">
                  {user.name?.charAt(0)?.toUpperCase() || "U"}
                </div>
                <div className="hidden sm:block">
                  <div className="text-sm font-medium text-white">
                    {user.name}
                  </div>
                  <div className="text-xs text-white/60">{user.email}</div>
                </div>
              </div>
              <button
                onClick={handleLogout}
                className="px-3 py-2 rounded-lg bg-rose-600 hover:bg-rose-700 text-white font-medium transition"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
