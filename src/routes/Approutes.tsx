import { useEffect, useState } from "react"; // Legg til useState for å kontrollere lasting
import { useDispatch } from "react-redux";
import { getCookie, removeCookie } from "../utils/cookieManager";
import jwtDecoder from "../utils/jwtDecoder";
import { loadUserFromJwt } from "../redux/userSlice";
import { Routes, Route } from "react-router-dom";
import PublicRoute from "./PublicRoute";
import ProtectedRoute from "./ProtectedRoute";
import AdminRoutes from "./AdminRoutes";
import UserRoutes from "./UserRoutes";
import LandingPage from "../pages/public/LandingPage/LandingPage";
import SignIn from "../pages/public/Auth/SignIn";
import AdminPage from "../pages/private/AdministrativePanel/AdminPage";
import UserPage from "../pages/private/AdministrativePanel/AdminPage";
import NotFound from "../pages/notFound/NotFound";

const AppRoutes = () => {
  const dispatch = useDispatch();
  const [authLoaded, setAuthLoaded] = useState(false); // Kontroll for lasting

  useEffect(() => {
    const initializeUser = async () => {
      const jwtToken = getCookie("authToken");
      if (!jwtToken) {
        setAuthLoaded(true); // Angi at autentiseringen er ferdig, selv uten JWT
        return;
      }

      try {
        const decoded = await jwtDecoder(jwtToken);
        if (decoded.username && decoded.role && decoded._uuid) {
          dispatch(
            loadUserFromJwt({
              username: decoded.username,
              role: decoded.role,
              _uuid: decoded._uuid,
              isAuthenticated: true,
            })
          );
        }
      } catch (error) {
        console.error("Feil ved dekoding av JWT:", error);
        removeCookie("authToken");
      } finally {
        setAuthLoaded(true); // Marker autentisering som fullført
      }
    };

    initializeUser();
  }, [dispatch]);

  // Vent til autentisering er lastet
  if (!authLoaded) {
    return <div>Loading...</div>;
  }

  return (
    <Routes>
      {/* Offentlige ruter */}
      <Route element={<PublicRoute />}>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<SignIn />} />
      </Route>

      {/* Beskyttede ruter for admin */}
      <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
        <Route path="/admin" element={<AdminPage />}>
          <Route path="*" element={<AdminRoutes />} />
        </Route>
      </Route>

      {/* Beskyttede ruter for bruker */}
      <Route element={<ProtectedRoute allowedRoles={["user"]} />}>
        <Route path="/user" element={<UserPage />}>
          <Route path="*" element={<UserRoutes />} />
        </Route>
      </Route>

      {/* Ikke funnet-side */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
