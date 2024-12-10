import { Routes, Route } from "react-router-dom";
import MyCvs from "../components/adminstration/cv/AllCvs";
import CreateCv from "../components/adminstration/cv/CreateCv";

const UserRoutes = () => (
  <Routes>
    <Route path="cvs-management" element={<MyCvs />} />
    <Route path="create-cv" element={<CreateCv />} />
  </Routes>
);

export default UserRoutes;
