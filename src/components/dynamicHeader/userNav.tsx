import { NavLink } from "react-router-dom";
import styles from "./header.module.css";

const UserNavigation = () => {
  return (
    <div className={styles.navigation}>
      <h1 className={styles.logo}>User Panel</h1>
      <ul className={styles.navList}>
        <li>
          <NavLink
            to="/user/cvs-management"
            className={({ isActive }) =>
              isActive ? styles.activeLink : styles.inactiveLink
            }
          >
            Mine CV-er
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/user/create-cv"
            className={({ isActive }) =>
              isActive ? styles.activeLink : styles.inactiveLink
            }
          >
            Opprett CV
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default UserNavigation;
