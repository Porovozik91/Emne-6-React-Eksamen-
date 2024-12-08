import { Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { getCookie } from "../utils/cookieManager";
import jwtDecoder from "../utils/jwtDecoder";
import { loadUserFromJwt } from "../redux/userSlice";
import ProtectedRoute from "./ProtectedRoute";
import PublicRoute from "./PublicRoute";
import AdminRoutes from "./AdminRoutes";
import UserRoutes from "./UserRoutes";
import LandingPage from "../pages/public/LandingPage/LandingPage";
import SignIn from "../pages/public/Auth/SignIn";
import AdminPage from "../pages/private/AdministrativePanel/AdminPage";
import NotFound from "../pages/notFound/NotFound";

const AppRoutes = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const initializeUser = async () => {
      const jwtToken = getCookie("authToken");
      if (!jwtToken) return;

      try {
        const decode = await jwtDecoder(jwtToken);
        if (decode.username && decode.role) {
          dispatch(loadUserFromJwt({ 
            username: decode.username, 
            role: decode.role, 
            _uuid: decode._uuid 
          }));
        }
      } catch (error) {
        console.error("Feil ved dekoding av JWT:", error);
      }
    };

    initializeUser();
  }, [dispatch]);

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
        <Route path="user-management/*" element={<AdminRoutes />} />
      </Route>
    </Route>

    {/* Beskyttede ruter for bruker */}
    <Route element={<ProtectedRoute allowedRoles={["user"]} />}>
      <Route path="/user" element={<AdminPage />}>
        <Route path="my-cv/*" element={<UserRoutes />} />
      </Route>
    </Route>

    {/* Ikke funnet-side for både admin og bruker */}
    <Route path="*" element={<NotFound />} />
  </Routes>
);
};

export default AppRoutes;