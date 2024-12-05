import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/userSlice";
import { useCookies } from "react-cookie";
import styles from "./Header.module.css";
import { NavLink } from "react-router-dom";


const Header = () => {
  const [cookies, , removeCookie] = useCookies(["username", "role"]);
  const username = cookies.username;
  const role = cookies.role;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    removeCookie("username", { path: "/" });
    removeCookie("role", { path: "/" });
    navigate("/");
  };

  useEffect(() => {
    if (!username || !role) {
      navigate("/"); 
    }
  }, [username, role, navigate]);

  if (!username || !role) {
    return null; 
  }

  return (
    <header className={styles.header}>
      <h2 className={styles.logo}>Admin Panel</h2>
      <section className={styles.userInfo}>
        <p>Velkommen, {username}!</p>
      </section>
      <section>
      <ul>
        <li><NavLink to="/admin/user-management">Brukeradministrasjon</NavLink></li>
        <li><NavLink to="/admin/cv-management">CV-administrasjon</NavLink></li>
        <button onClick={handleLogout}>Logg ut</button>
      </ul>
      </section>
    </header>
  );
};

export default Header;
