import { Outlet } from "react-router-dom";
import Header from "../../../components/Header/Header";

const AdminPage = () => {
  return (
    <section>
      <Header />
        <main>
          <Outlet />
        </main>
    </section>
  );
};

export default AdminPage;








