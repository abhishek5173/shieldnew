import React from 'react';
import { Navigate } from 'react-router-dom';

function PublicRoute({ children }) {
  const user = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null;

  if (user) {
    if (user.role === "customer") {
      return <Navigate to="/customer" />;
    } else if (user.role === "owner") {
      return <Navigate to="/owner" />;
    }
  }

  return children;
}

export default PublicRoute;
