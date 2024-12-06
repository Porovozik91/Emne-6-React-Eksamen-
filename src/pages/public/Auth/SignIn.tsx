import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../../../redux/userSlice"; // Redux-slice for autentisering
import { useLazyGetUsersQuery } from "../../../services/userApi"; // API for å hente brukere
import hashPassword from "../../../utils/hashPassword"; // Funksjon for hashing

const SignIn = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [triggerGetUsers] = useLazyGetUsersQuery(); // Lazy query

  const handleLogin = async () => {
    const adminUsername = import.meta.env.VITE_ADMIN_USERNAME;
    const adminPassword = import.meta.env.VITE_ADMIN_PASSWORD;
    const adminRole = import.meta.env.VITE_ADMIN_ROLE;

    // Verifisere login for admin
    if (username === adminUsername && password === adminPassword) {
      dispatch(login({ username, role: adminRole }));
      navigate("/admin");
      return;
    }

    try {
      const { data: users = [] } = await triggerGetUsers(); // Hent brukere manuelt

      // Hash passordet brukeren oppgir
      const hashedInputPassword = await hashPassword(password);

      // Sjekk om brukeren eksisterer med matchende passord
      const user = users.find(
        (u) => u.username === username && u.password === hashedInputPassword
      );

      if (user) {
        dispatch(login({ username: user.username, role: user.role }));
        navigate("/user/my-cv/home");
      } else {
        setError("Feil brukernavn eller passord.");
      }
    } catch (error) {
      console.error("Feil ved innlogging:", error);
      setError("Kunne ikke logge inn. Prøv igjen.");
    }
  };

  return (
    <div>
      <h2>Logg Inn</h2>
      <input
        type="text"
        placeholder="Brukernavn"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Passord"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      {error && <p>{error}</p>}
      <button onClick={handleLogin}>Logg inn</button>
    </div>
  );
};

export default SignIn;





