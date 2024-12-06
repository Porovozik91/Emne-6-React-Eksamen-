import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "../../redux/store";
import { logout } from "../../redux/userSlice";
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
      <nav className={styles.navbar}>
        {role === "admin" && (
          <>
                <h1 className={styles.logo}>Admin Panel</h1>
            <button onClick={() => navigate("/admin/user-management/overview")}>
              Brukeradministrasjon
            </button>
            <button onClick={() => navigate("/admin/cv-management")}>
              CV-administrasjon
            </button>
          </>
        )}
        {role === "user" && (
          <>
          <h1 className={styles.logo}>User Panel</h1>
            <button onClick={() => navigate("/user/my-cv/home")}>Administrasjon av Cver</button>
          </>
        )}
      </nav>
      <div className={styles.userSection}>
        <span className={styles.username}>Logget inn som: {username}</span>
        <button onClick={handleLogout} className={styles.logoutButton}>
          Logg ut
        </button>
      </div>
    </header>
  );
};

export default Header;


