import { NavLink, useLocation } from "react-router-dom";
import styles from "./sidebar.module.css";

const Sidebar = () => {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith("/admin");
  const isUser = location.pathname.startsWith("/user");

  return (
    <aside className={styles.sidebar}>
      <ul className={styles.navList}>
        {isAdmin && (
          <>
            <li>
              <NavLink
                to="/admin/user-management/all-users"
                className={({ isActive }) =>
                  isActive ? styles.activeLink : styles.inactiveLink
                }
              >
                Alle brukere
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/admin/user-management/add-user"
                className={({ isActive }) =>
                  isActive ? styles.activeLink : styles.inactiveLink
                }
              >
                Legg til bruker
              </NavLink>
            </li>
          </>
        )}
        {isUser && (
          <>
            <li>
              <NavLink
                to="/user/my-cv"
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
          </>
        )}
        {!isAdmin && !isUser && <p>Velg en administrasjon fra headeren</p>}
      </ul>
    </aside>
  );
};

export default Sidebar;

