import { Routes, Route } from "react-router-dom";
import UserManager from "../components/admin/userManagement/UserManager";
import CreateUser from "../components/admin/userManagement/UserCreator";
import CreateCv from "../components/adminstration/cv/CreateCv";
import MyCv from "../components/user/MyCv";

const AdminRoutes = () => (
  <Routes>
    <Route path="users-cvs-management" element={<UserManager />} />
    <Route path="create-user" element={<CreateUser />} />
    <Route path="cvs-management" element={<MyCv />} />
    <Route path="create-cv" element={<CreateCv />} />
  </Routes>
);

export default AdminRoutes;

