import { NavLink, useLocation } from "react-router-dom";
import styles from "./sidebar.module.css";

const Sidebar = () => {
  const location = useLocation();
  const isUserManagement = location.pathname.includes("user");

  return (
    <aside className={styles.sidebar}>
      <ul className={styles.navList}>
        {isUserManagement ? (
          <>
            <li>
              <NavLink
                to="/adminPage/user/all-users"
                className={({ isActive }) =>
                  isActive ? styles.activeLink : styles.inactiveLink
                }
              >
                Alle brukere
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/adminPage/user/add-user"
                className={({ isActive }) =>
                  isActive ? styles.activeLink : styles.inactiveLink
                }
              >
                Legg til bruker
              </NavLink>
            </li>
          </>
        ) : (
          <p>Velg en administrasjon fra headeren</p>
        )}
      </ul>
    </aside>
  );
};

export default Sidebar;
