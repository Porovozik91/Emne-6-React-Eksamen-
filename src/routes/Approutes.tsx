import { Routes, Route } from "react-router-dom";
import LandingPage from "../pages/public/LandingPage/LandingPage";
import SignIn from "../pages/public/Auth/SignIn";
import AdminPage from "../pages/private/Admin/AdminPage";
import ProtectedRoute from "./ProtectedRoute";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<SignIn />} />
      <Route path="/AdminPage" element={<AdminPage />} />
      <Route element={<ProtectedRoute allowedRoles={['admin', 'user']} />}>
{/*   <Route path="/user-AdminPage" element={<UserAdminPage />} />*/}
</Route>

    </Routes>
  );
};

export default AppRoutes;
