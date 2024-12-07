import { Link } from "react-router-dom";
import styles from "./notFound.module.css";

const NotFound = () => (
  <div className={styles.container}>
    <h1>Siden finnes ikke</h1>
    <p>
      Siden du leter etter er enten flyttet eller eksisterer ikke lenger.
    </p>
    <p>
      <Link to="/">Gå til forsiden</Link>
    </p>
  </div>
);

export default NotFound;
