import { useState } from "react";
import { useLazyGetUsersQuery, useAddUserMutation } from "../../../services/userApi";
import styles from "./UserCreator.module.css";
import hashPassword from "../../../utils/hashPassword";

const UserCreator = () => {
  const [addUser] = useAddUserMutation();
  const [triggerGetUsers] = useLazyGetUsersQuery(); // Lazy query for å slippe lasting forveiene
  const [newUser, setNewUser] = useState({ username: "", password: "" });
  const [message, setMessage] = useState<string | null>(null);
  const [isError, setIsError] = useState(false);

  const handleUserCreator = async () => {
    if (!newUser.username || !newUser.password) {
      setMessage("Vennligst fyll inn både brukernavn og passord.");
      setIsError(true);
      return;
    }

    try {
      const { data: users = [] } = await triggerGetUsers(); 
      const userExists = users.some((user) => user.username.toLowerCase() === newUser.username.toLowerCase());

      if (userExists) {
        setMessage(`Brukeren "${newUser.username}" finnes allerede.`);
        setIsError(true);
        return;
      }

      const hashedPassword = await hashPassword(newUser.password);

      await addUser({
        username: newUser.username,
        password: hashedPassword,
        role: "user",
      }).unwrap();

      setMessage(`Bruker "${newUser.username}" er lagt til!`);
      setIsError(false);
      setNewUser({ username: "", password: "" });
    } catch (error) {
      console.error("Feil under opprettelse av bruker:", error);
      setMessage("Kunne ikke legge til bruker. Prøv igjen.");
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
        onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
        className={styles.input}
      />
      <input
        type="password"
        placeholder="Passord"
        value={newUser.password}
        onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
        className={styles.input}
      />
      <button onClick={handleUserCreator} className={styles.addButton}>
        Legg til bruker
      </button>

      {message && (
        <p className={isError ? styles.errorMessage : styles.successMessage}>
          {message}
        </p>
      )}
    </div>
  );
};

export default UserCreator;






