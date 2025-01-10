import { Link } from "react-router-dom";
import styles from "./landingPage.module.css";

const LandingPage = () => {
  return (
    <section className={styles.landingPageOverlay}>
      <main>
        <h1>Bygg din perfekte CV</h1>
        <h2>Skap, tilpass, og gjør inntrykk!</h2>
        <p>
       Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio possimus voluptatibus expedita adipisci, aliquam, quaerat ipsum recusandae vero illum autem et ut doloremque? Tempore unde ipsam animi maiores blanditiis dolorem.
       Officiis, repellendus doloremque amet tempora ducimus nostrum quas molestias ratione optio deserunt natus, inventore eaque, in sequi totam. Perferendis placeat vero, ipsa qui id consequuntur ea in iusto quidem iure?
        </p>
        <Link to="/login">
        <button>Gå til påloggingssiden</button>
        </Link>
      </main>
    </section>
  );
};

export default LandingPage;
