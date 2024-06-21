import { Navigate } from "react-router-dom";

export const ProtectedRoute = ({ loggedIn, isLoggedInLoading, children }) => {
  if (isLoggedInLoading) {
    return null;
  }
  return loggedIn ? children : <Navigate to="/" replace />;
};
