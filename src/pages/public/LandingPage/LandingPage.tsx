import { Link } from "react-router-dom";
import styles from "./landingPage.module.css";

const LandingPage = () => {
  return (
    <section className={styles.landingPageOverlay}>
      <main>
        <h1>Bygg din perfekte CV</h1>
        <h2>Skap, tilpass, og gjør inntrykk!</h2>
        <p>
        Med vår dynamiske CV-applikasjon kan du enkelt lage, tilpasse og
        eksportere CV-en din – alt i én plass! <br /> Tilpass for hver jobb, fremhev
        dine ferdigheter, og få CV-en i profesjonell PDF på sekunder. <br /> Ingen
        flere utdatert CV-er – bare én som alltid er klar for neste steg i
        karrieren!
        </p>
        <Link to="/login">
        <button>Gå til påloggingssiden</button>
        </Link>
      </main>
    </section>
  );
};

export default LandingPage;
