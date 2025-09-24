import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../Context/Authcontext";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user } = useContext(AuthContext);

  // If no user logged in → redirect to login
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // If role is restricted → redirect to home
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }

  // ✅ User is authorized
  return children;
};

export default ProtectedRoute;
