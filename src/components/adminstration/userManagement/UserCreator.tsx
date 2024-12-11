import { useState } from "react";
import { useLazyGetUsersQuery, useAddUserMutation } from "../../../services/userApi";
import styles from "./UserCreator.module.css";
import hashPassword from "../../../utils/hashPassword";

const UserCreator = () => {
  const [addUser] = useAddUserMutation();
  const [triggerGetUsers] = useLazyGetUsersQuery();
  const [newUser, setNewUser] = useState({ name: "", email: "", password: "" });
  const [message, setMessage] = useState<string | null>(null);
  const [isError, setIsError] = useState(false);

  const handleUserCreator = async () => {
    if (!newUser.name || !newUser.password) {
      setMessage("Vennligst fyll inn både brukernavn og passord.");
      setIsError(true);
      return;
    }

    try {

      const { data } = await triggerGetUsers();
      const users = data || [];
      const userExists = users.some(
        (user) => user.name.toLowerCase() === newUser.name.toLowerCase()
      );

      if (userExists) {
        setMessage(`Brukeren "${newUser.name}" finnes allerede.`);
        setIsError(true);
        return;
      }

      const hashedPassword = await hashPassword(newUser.password);

      await addUser({
        name: newUser.name,
        email: newUser.email,
        password: hashedPassword,
        role: "user",
      }).unwrap();

      setMessage(`Bruker "${newUser.name}" er lagt til!`);
      setIsError(false);
      setNewUser({ name: "", email: "", password: "" });
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
        value={newUser.name}
        onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
        className={styles.input}
      />
      <input
        type="email"
        placeholder="E-post"
        value={newUser.email}
        onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
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
