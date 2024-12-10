import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

const PublicRoute = () => {
  const { isAuthenticated, role } = useSelector((state: RootState) => state.user);
  const location = useLocation();

  // Hvis brukeren er pålogget og prøver å navigere til /login, omdiriger dem basert på rolle
  if (isAuthenticated && location.pathname === "/login") {
    return role === "admin" ? (
      <Navigate to="/admin/users-cvs-management" replace />
    ) : (
      <Navigate to="/user/cvs-management" replace />
    );
  }

  // Ellers tillat tilgang til offentlige ruter
  return <Outlet />;
};

export default PublicRoute;



