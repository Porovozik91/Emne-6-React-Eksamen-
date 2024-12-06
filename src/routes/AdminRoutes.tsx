import { Routes, Route } from "react-router-dom";
import UserManagerOverview from "../components/admin/userManagement/UserManagerOverview";
import UserManager from "../components/admin/userManagement/UserManager";
import AddUser from "../components/admin/userManagement/UserCreator";

const AdminRoutes = () => (
  <Routes>
    <Route path="overview" element={<UserManagerOverview />} />
    <Route path="all-users" element={<UserManager />} />
    <Route path="add-user" element={<AddUser />} />
  </Routes>
);

export default AdminRoutes;

