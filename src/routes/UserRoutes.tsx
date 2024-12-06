import { Routes, Route } from "react-router-dom";
import MyCv from "../components/user/MyCv";
import UserHome from "../components/user/UserHome";
import CreateCv from "../components/user/CreateCv";

const UserRoutes = () => (
  <Routes>
    <Route path="home" element={<UserHome />} />
    <Route path="my-cv" element={<MyCv />} />
    <Route path="create-cv" element={<CreateCv />} />
  </Routes>
);

export default UserRoutes;
