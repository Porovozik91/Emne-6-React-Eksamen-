import { Routes, Route } from "react-router-dom";
import LandingPage from "../pages/public/LandingPage/LandingPage";
import SignIn from "../pages/public/Auth/SignIn";
import AdminPage from "../pages/private/AdministrativPanel/AdminPage";
import ProtectedRoute from "./ProtectedRoute";
import AdminRoutes from "./AdminRoutes";
import UserRoutes from "./UserRoutes";

const AppRoutes = () => (
  <Routes>
    {/* Offentlige ruter */}
    <Route path="/" element={<LandingPage />} />
    <Route path="/login" element={<SignIn />} />

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
  </Routes>
);

export default AppRoutes;


