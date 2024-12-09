import { NavLink } from "react-router-dom";
import styles from "./header.module.css";

const AdminNavigation = () => {
  return (
    <div className={styles.navigation}>
      <h1 className={styles.logo}>Admin Panel</h1>
      <ul className={styles.navList}>
          <>
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
                to="/admin/create-user"
                className={({ isActive }) =>
                  isActive ? styles.activeLink : styles.inactiveLink
                }
              >
                Opprett brukere
              </NavLink>
            </li>
            <li>
          <NavLink
            to="/admin/cvs-management"
            className={({ isActive }) =>
              isActive ? styles.activeLink : styles.inactiveLink
            }
          >
            Alle CV-er
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/admin/create-cv"
            className={({ isActive }) =>
              isActive ? styles.activeLink : styles.inactiveLink
            }
          >
            Opprett CV
          </NavLink>
        </li>
          </>
      </ul>
    </div>
  );
};

export default AdminNavigation;
