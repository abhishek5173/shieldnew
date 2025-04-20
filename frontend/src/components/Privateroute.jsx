// Privateroute.js
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

function Privateroute({ children }) {
  const user = JSON.parse(localStorage.getItem("user"));
  const location = useLocation();

  if (!user) return <Navigate to="/login" />;

  if (user.role === "customer" && location.pathname !== "/customer") {
    return <Navigate to="/customer" />;
  }

  if (user.role === "owner" && location.pathname !== "/owner") {
    return <Navigate to="/owner" />;
  }

  return children;
}

export default Privateroute;
