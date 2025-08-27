// components/ProtectedRoute.js
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({ children, requireAuth = true }) => {
  const { token } = useAuth();

  // If route requires authentication but user is not authenticated
  if (requireAuth && !token) {
    return <Navigate to="/login" replace />;
  }

  // If route requires no authentication but user is authenticated
  if (!requireAuth && token) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
