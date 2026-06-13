import { Navigate } from "react-router-dom";

function ProtectedAdminRoute({ children }) {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  if (currentUser.role !== "admin") {
    return <Navigate to="/" replace />;
  }

  return children;
}

export default ProtectedAdminRoute;