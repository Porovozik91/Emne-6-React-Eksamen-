import { Routes, Route } from "react-router-dom";
import AllCvs from "../components/adminstration/cv/allAndAdministrate/AllCvs";

const UserRoutes = () => (
  <Routes>
    <Route path="cvs-management" element={<AllCvs />} />
  </Routes>
);

export default UserRoutes;
