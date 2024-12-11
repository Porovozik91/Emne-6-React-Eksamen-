import { Routes, Route } from "react-router-dom";
import UserManager from "../components/adminstration/userManagement/UserManager";
import AllCvs from "../components/adminstration/cv/AllCvs";

const AdminRoutes = () => (
  <Routes>
    <Route path="users-cvs-management" element={<UserManager />} />
    <Route path="cvs-management" element={<AllCvs />} />
  </Routes>
);

export default AdminRoutes;

