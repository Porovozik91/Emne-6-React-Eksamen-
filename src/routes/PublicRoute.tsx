import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

const PublicRoute = () => {
  const { isAuthenticated, role } = useSelector((state: RootState) => state.user);
  const location = useLocation();

  if (isAuthenticated && location.pathname === "/login") {
    return role === "admin" ? (
      <Navigate to="/admin/users-cvs-management" replace />
    ) : (
      <Navigate to="/user/cvs-management" replace />
    );
  }

  return <Outlet />;
};

export default PublicRoute;



