import { useState } from "react";
import { useAddUserMutation } from "../../../services/userApi";
import styles from "./UserCreator.module.css";

const UserCreator = () => {
  const [UserCreator] = useAddUserMutation();
  const [newUser, setNewUser] = useState({
    username: "",
    password: "",
  });
  const [message, setMessage] = useState<string | null>(null); // Tilstand for meldinger
  const [isError, setIsError] = useState(false); // Tilstand for feil

  const handleUserCreator = async () => {
    if (!newUser.username || !newUser.password) {
      setMessage("Vennligst fyll inn både brukernavn og passord.");
      setIsError(true);
      return;
    }

    try {
      await UserCreator({
        username: newUser.username,
        password: newUser.password,
        role: "user", 
      }).unwrap();

      setNewUser({ username: "", password: "" });
      setMessage(`Bruker "${newUser.username}s" er lagt til!`);
      setIsError(false);
    } catch (error) {
      console.error("Feil under opprettelse av bruker:", error);
      setMessage("Kunne ikke legge til bruker. Vennligst prøv igjen.");
      setIsError(true);
    }
  };

  return (
    <div className={styles.container}>
      <h2>Legg til ny bruker</h2>
      <input
        type="text"
        placeholder="Brukernavn"
        value={newUser.username}
        onChange={(e) =>
          setNewUser({ ...newUser, username: e.target.value })
        }
        className={styles.input}
      />
      <input
        type="password"
        placeholder="Passord"
        value={newUser.password}
        onChange={(e) =>
          setNewUser({ ...newUser, password: e.target.value })
        }
        className={styles.input}
      />
      <button onClick={handleUserCreator} className={styles.addButton}>
        Legg til bruker
      </button>

      {message && (
        <p
          className={
            isError ? styles.errorMessage : styles.successMessage
          }
        >
          {message}
        </p>
      )}
    </div>
  );
};

export default UserCreator;



