import { Routes, Route } from "react-router-dom";
import UserManager from "../components/adminstration/userManagement/UserManager";
import CreateUser from "../components/adminstration/userManagement/UserCreator";
import CreateCv from "../components/adminstration/cv/CreateCv";
import MyCv from "../components/adminstration/cv/AllCvs";

const AdminRoutes = () => (
  <Routes>
    <Route path="users-cvs-management" element={<UserManager />} />
    <Route path="create-user" element={<CreateUser />} />
    <Route path="cvs-management" element={<MyCv />} />
    <Route path="create-cv" element={<CreateCv />} />
  </Routes>
);

export default AdminRoutes;

