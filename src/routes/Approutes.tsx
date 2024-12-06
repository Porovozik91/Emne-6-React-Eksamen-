import { Routes, Route } from "react-router-dom";
import LandingPage from "../pages/public/LandingPage/LandingPage";
import SignIn from "../pages/public/Auth/SignIn";
import AdminPage from "../pages/private/Admin/AdminPage";
import ProtectedRoute from "./ProtectedRoute";
import UserManagerRoute from "./UserManagerRoute";

const AppRoutes = () => (
  <Routes>
    {/* Offentlige ruter */}
    <Route path="/" element={<LandingPage />} />
    <Route path="/login" element={<SignIn />} />

    {/* Beskyttede ruter */}
    <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
      <Route path="/adminPage" element={<AdminPage />}>
        <Route path="user/*" element={<UserManagerRoute />} />
      </Route>
    </Route>
  </Routes>
);

export default AppRoutes;

