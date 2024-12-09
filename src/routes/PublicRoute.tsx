import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

const PublicRoute = () => {
  const { username, role } = useSelector((state: RootState) => state.user);

  if (username && role) {
    return role === "admin" ? (
      <Navigate to="/admin/users-cvs-management" replace />
    ) : (
      <Navigate to="/user/cvs-management" replace />
    );
  }

  return <Outlet />;
};

export default PublicRoute;

