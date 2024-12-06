import Header from "../../../components/dynamicHeader/Header";
import Sidebar from "../../../components/dynamicSidebar/Sidebar";
import { Outlet } from "react-router-dom";
import styles from "./adminPage.module.css";

const AdminPage = () => (
  <div className={styles.adminLayout}>
    <Header />
    <div className={styles.content}>
      <Sidebar />
      <main className={styles.mainContent}>
        <Outlet />
      </main>
    </div>
  </div>
);

export default AdminPage;






