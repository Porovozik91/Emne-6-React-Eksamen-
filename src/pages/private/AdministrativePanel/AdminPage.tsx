import { Outlet } from "react-router-dom";
import Header from "../../../components/Header/Header";
import styles from "./adminPage.module.css";

const AdminPage = () => {
  return (
    <div className={styles.adminLayout}>
      <Header />
      <div className={styles.content}>
        <main className={styles.mainContent}>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminPage;








