import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const [nav, setNav] = useState(false);
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (user?.role === "customer") {
      setNav(true);
    }
  }, [user]);

  const handleLogoClick = () => {
    if (!user) {
      navigate("/");
    } else if (user.role === "owner") {
      navigate("/owner");
    } else if (user.role === "customer") {
      navigate("/customer");
    } else {
      navigate("/");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <nav className="bg-white shadow-md px-6 py-3 flex justify-between items-center">
      <div
        className="text-2xl font-extrabold text-indigo-600 tracking-wide cursor-pointer select-none"
        onClick={handleLogoClick}
      >
        <span className="text-black">S</span>HIELD
      </div>

      <div className="flex items-center gap-4">
        <button
          onClick={() => navigate("/about")}
          className="text-sm text-gray-700 hover:text-indigo-600 transition"
        >
          About
        </button>

  
        {nav && (
          <>
            <button
              
              className="text-sm text-gray-700 hover:text-indigo-600 transition"
            >
              Bill History
            </button>
            <button
              
              className="text-sm text-gray-700 hover:text-indigo-600 transition"
            >
              Gamification & Rewards
            </button>
          </>
        )}

        {!user ? (
          <>
            <button
              onClick={() => navigate("/login")}
              className="text-sm text-gray-700 hover:text-indigo-600 transition"
            >
              Login
            </button>
            <button
              onClick={() => navigate("/signup")}
              className="text-sm bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-1.5 rounded transition"
            >
              Sign Up
            </button>
          </>
        ) : (
          <button
            onClick={handleLogout}
            className="text-sm bg-red-500 hover:bg-red-600 text-white px-4 py-1.5 rounded transition"
          >
            Logout
          </button>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
