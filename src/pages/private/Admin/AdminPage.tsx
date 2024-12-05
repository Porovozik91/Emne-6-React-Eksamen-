import { Outlet } from "react-router-dom";
import styles from "./adminPage.module.css";
import PageLayout from "../../../components/pageLayout/PageLayout";

const AdminPage = () => {
  return (
    <div className={styles.container}>
      <div className={styles.mainContent}>
      <PageLayout />
        <div className={styles.content}>
          <h2>Velkommen til Admin Panel</h2>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminPage;




