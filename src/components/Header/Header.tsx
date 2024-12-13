import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "../../redux/store";
import { logout } from "../../redux/userSlice";
import AdminNav from "./adminNav";
import UserNav from "./userNav";
import styles from "./header.module.css";

const Header = () => {
  const { role, username } = useSelector((state: RootState) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
   <header className={styles.header}>
  <nav className={styles.headerNavigation}>
      {role === "admin" && <AdminNav />}
      {role === "user" && <UserNav />}
  <ul className={styles.userInfo}>
  <li>Velkommen: {username}</li>
  <li>
    <button onClick={handleLogout} className={styles.logoutButton}>
      Logg ut
    </button>
  </li>
</ul>
  </nav>
</header>
  );
};

export default Header;



