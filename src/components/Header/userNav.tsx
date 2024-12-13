import { NavLink } from "react-router-dom";
import styles from "./header.module.css";

const UserNavigation = () => {
  return (
    <section>
      <h1>User Panel</h1>
      <ul>
        <li>
          <NavLink
            to="/user/cvs-management"
            className={({ isActive }) =>
              isActive ? styles.activeLink : styles.inactiveLink
            }
          >
          Administrer mine CV-er
          </NavLink>
        </li>
      </ul>
    </section>
  );
};

export default UserNavigation;
