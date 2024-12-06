import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../../../redux/userSlice"; // Redux-slice for autentisering

const SignIn = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = () => {
    const adminUsername = import.meta.env.VITE_ADMIN_USERNAME;
    const adminPassword = import.meta.env.VITE_ADMIN_PASSWORD;
    const adminRole = import.meta.env.VITE_ADMIN_ROLE;

    // Verifisere login for admin
    if (username === adminUsername && password === adminPassword) {
      dispatch(login({ username, role: adminRole })); // Redux håndterer cookies
      navigate("/AdminPage");
    } else {
      setError("Feil brukernavn eller passord.");
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


