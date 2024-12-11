import { Routes, Route } from "react-router-dom";
import AllCvs from "../components/adminstration/cv/AllCvs";

const UserRoutes = () => (
  <Routes>
    <Route path="cvs-management" element={<AllCvs />} />
  </Routes>
);

export default UserRoutes;
