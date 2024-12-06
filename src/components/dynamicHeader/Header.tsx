import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "../../redux/store";
import { logout } from "../../redux/userSlice";
import styles from "./Header.module.css";

const Header = () => {
  const { role, username } = useSelector((state: RootState) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <header className={styles.header}>
      <h1 className={styles.logo}>Admin Panel</h1>
      <nav className={styles.navbar}>
        {role === "admin" && (
          <>
            <button onClick={() => navigate("/adminPage/user")}>
              Brukeradministrasjon
            </button>
            <button onClick={() => navigate("/adminPage/cv")}>
              CV-administrasjon
            </button>
          </>
        )}
        {role === "user" && (
          <>
            <button onClick={() => navigate("/mypage/cvs")}>Mine CV-er</button>
            <button onClick={() => navigate("/mypage/cv-management")}>
              CV-administrasjon
            </button>
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

