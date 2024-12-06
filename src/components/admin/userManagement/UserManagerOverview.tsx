import styles from "./UserManagerOverview.module.css";

const UserManagerOverview = () => (
  <div className={styles.container}>
    <h2>Brukeradministrasjon</h2>
    <p>
      Velkommen til Brukeradministrasjon. Her kan du administrere brukere ved å
      legge til nye brukere, oppdatere informasjon, eller fjerne eksisterende brukere.
    </p>
  </div>
);

export default UserManagerOverview;
