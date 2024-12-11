import { useState } from "react";
import { useLazyGetUsersQuery, useAddUserMutation } from "../../../services/userApi";
import styles from "./UserCreator.module.css";
import hashPassword from "../../../utils/hashPassword";
import { validateUser } from "../../../utils/validateUser";
import { existingUsersCheck } from "../../../utils/exsistingUsersCheck";

const initialUserState = { name: "", email: "", password: "" };

const UserCreator = () => {
  const [addUser, { isLoading: isSubmitting }] = useAddUserMutation();
  const [triggerGetUsers] = useLazyGetUsersQuery();
  const [newUser, setNewUser] = useState(initialUserState);
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});
  const [message, setMessage] = useState<string | null>(null);
  const [isError, setIsError] = useState(false);

  const handleInputChange = (field: keyof typeof newUser, value: string) => {
    setNewUser((prev) => ({ ...prev, [field]: value }));
  };

  const handleUserCreator = async () => {
    const { isValid, errors } = validateUser(newUser);
    if (!isValid) {
      setValidationErrors(errors);
      setMessage("Validering feilet. Rett opp feltene nedenfor.");
      setIsError(true);
      return;
    }

    try {
      const { data } = await triggerGetUsers();
      const users = data || [];
      const { exists, fields } = existingUsersCheck(users, newUser.name, newUser.email);

      if (exists) {
        setMessage(`Brukeren med ${fields.join(" og ")} finnes allerede.`);
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
      setNewUser(initialUserState);
      setValidationErrors({});
    } catch (error) {
      console.error("Feil under opprettelse av bruker:", error);
      setMessage("Kunne ikke legge til bruker. Prøv igjen.");
      setIsError(true);
    }
  };

  const renderValidationSummary = () => {
    const errorMessages = Object.values(validationErrors).filter(Boolean);
    if (!errorMessages.length) return null;

    return (
      <div className={styles.validationSummary}>
        <h4>Disse feltene må være utfylt:</h4>
        <ul>
          {errorMessages.map((error, index) => (
            <li key={index} className={styles.error}>
              {error}
            </li>
          ))}
        </ul>
      </div>
    );
  };

  return (
    <div className={styles.container}>
      <h2>Opprett ny bruker</h2>

      {message && (
        <p className={isError ? styles.errorMessage : styles.successMessage}>
          {message}
        </p>
      )}

      {renderValidationSummary()}

      <label>Brukernavn</label>
      <input
        type="text"
        placeholder="Skriv inn brukernavn"
        value={newUser.name}
        onChange={(e) => handleInputChange("name", e.target.value)}
        className={styles.input}
      />
      <label>E-post</label>
      <input
        type="email"
        placeholder="Skriv inn e-post"
        value={newUser.email}
        onChange={(e) => handleInputChange("email", e.target.value)}
        className={styles.input}
      />
      <label>Passord</label>
      <input
        type="password"
        placeholder="Skriv inn passord"
        value={newUser.password}
        onChange={(e) => handleInputChange("password", e.target.value)}
        className={styles.input}
      />
      <button
        onClick={handleUserCreator}
        className={styles.submitButton}
        disabled={isSubmitting}
      >
        {isSubmitting ? "Legger til bruker..." : "Legg til bruker"}
      </button>
    </div>
  );
};

export default UserCreator;

