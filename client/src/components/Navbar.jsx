import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm backdrop-blur-md bg-white/90">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          {/* Logo Section */}
          <div 
            className="flex items-center gap-2 cursor-pointer group" 
            onClick={() => navigate("/")}
          >
            <div className="bg-blue-600 p-1.5 rounded-lg transition-transform group-hover:scale-110">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <h1 className="text-xl font-extrabold tracking-tight text-gray-900">
              Job<span className="text-blue-600">Tracker</span>
            </h1>
          </div>

          {/* Navigation Links */}
          <div className="flex items-center space-x-6">
            {user ? (
              <>
                <div className="hidden md:flex flex-col items-end">
                  <span className="text-sm font-medium text-gray-700">Welcome back,</span>
                  <span className="text-xs text-blue-600 font-semibold">{user.name}</span>
                </div>
                <button
                  onClick={handleLogout}
                  className="bg-gray-900 text-white px-5 py-2 rounded-full text-sm font-medium transition-all hover:bg-gray-800 hover:shadow-lg active:scale-95"
                >
                  Logout
                </button>
              </>
            ) : (
              <div className="flex items-center space-x-4">
                <Link 
                  to="/login" 
                  className="text-gray-600 hover:text-blue-600 font-medium transition-colors"
                >
                  Login
                </Link>
                <Link 
                  to="/register" 
                  className="bg-blue-600 text-white px-5 py-2 rounded-full text-sm font-medium transition-all hover:bg-blue-700 hover:shadow-md active:scale-95"
                >
                  Get Started
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;