import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store"; // Importer riktig state type

interface ProtectedRouteProps {
  allowedRoles: string[]; // Tillatte roller for denne ruten
}

const ProtectedRoute = ({ allowedRoles }: ProtectedRouteProps) => {
  const user = useSelector((state: RootState) => state.user);  // Henter brukerinfo fra Redux

  // Hvis brukeren ikke er logget inn eller ikke har riktig rolle, send dem til login-siden
  if (!user.username || !allowedRoles.includes(user.role!)) {
    return <Navigate to="/login" />;
  }

  // Hvis brukeren har riktig rolle, vis innholdet i Outlet (barnruter)
  return <Outlet />;
};

export default ProtectedRoute;
