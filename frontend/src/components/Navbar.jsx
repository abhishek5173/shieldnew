import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const [user, setUser] = useState(() => JSON.parse(localStorage.getItem("user")));
  const [nav, setNav] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.role === "customer") {
      setNav(true);
    } else {
      setNav(false);
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
    setUser(null); // ✅ Update state
    setNav(false); // ✅ Optional but good for clarity
    navigate("/");
  };

  return (
    <nav
      className={`bg-white shadow-md px-6 py-3 flex justify-between items-center ${
        window.location.pathname === "/" ? "bg-cover bg-top" : ""
      }`}
      style={
        window.location.pathname === "/"
          ? { backgroundImage: "url('/bgnew.jpg')" }
          : {}
      }
    >
      <div
        className="text-2xl font-extrabold text-indigo-600 tracking-wide cursor-pointer select-none"
        onClick={handleLogoClick}
      >
        <span className="text-black">S</span>HIELD

       
      </div>

      <div className="flex items-center gap-8 font-bold text-lg ">
        <button
          onClick={() => navigate("/about/upcst")}
          className=" text-gray-700  hover:text-indigo-600 transition"
        >
          UPCST
        </button>
        <button
          onClick={() => navigate("/about/grant")}
          className=" text-gray-700 hover:text-indigo-600 transition"
        >
          UPCST GRANT SCHEME
        </button>
        <button
          onClick={() => navigate("/about/team")}
          className=" text-gray-700 hover:text-indigo-600 transition"
        >
          TEAM
        </button>
        <button
          onClick={() => navigate("/papers")}
          className=" text-gray-700 hover:text-indigo-600 transition"
        >
         RESEARCH PAPERS
        </button>
        <button
          onClick={() => navigate("/about/shield")}
          className=" text-gray-700 hover:text-indigo-600 transition"
        >
          SHIELD
        </button>
        
        
      </div>
      <div className="flex gap-4">
        {nav && (
          <>
            <button className="text-sm text-gray-700 hover:text-indigo-600 transition">
              Bill History
            </button>
          </>
        )}

        {!user ? (
          <>
            <button
              onClick={() => navigate("/login")}
              className="text-lg font-bold text-gray-700 hover:text-indigo-600 transition"
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
