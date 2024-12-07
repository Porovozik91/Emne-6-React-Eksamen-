import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

const PublicRoute = () => {
  const { username, role } = useSelector((state: RootState) => state.user);

  if (username && role) {
    return role === "admin" ? (
      <Navigate to="/admin/user-management/overview" replace />
    ) : (
      <Navigate to="/user/my-cv/home" replace />
    );
  }

  return <Outlet />;
};

export default PublicRoute;

