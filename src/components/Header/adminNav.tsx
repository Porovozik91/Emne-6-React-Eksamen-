import { NavLink } from "react-router-dom";
import styles from "./header.module.css";

const AdminNavigation = () => {
  return (
    <section>
      <h1>Admin Panel</h1>
      <ul>
            <li>
              <NavLink
                to="/admin/users-cvs-management"
                className={({ isActive }) =>
                  isActive ? styles.activeLink : styles.inactiveLink
                }
              >
                Administrer brukere
              </NavLink>
            </li>
            <li>
          <NavLink
            to="/admin/cvs-management"
            className={({ isActive }) =>
              isActive ? styles.activeLink : styles.inactiveLink
            }
          >
           Administrer Cv-er
          </NavLink>
        </li>
      </ul>
    </section>
  );
};

export default AdminNavigation;
