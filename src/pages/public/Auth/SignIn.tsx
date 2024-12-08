import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../../../redux/userSlice"; 
import { useLazyGetUsersQuery } from "../../../services/userApi"; 
import hashPassword from "../../../utils/hashPassword"; 

const SignIn = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [triggerGetUsers] = useLazyGetUsersQuery(); 
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    setError("");

    if (!username || !password) {
      setError("Brukernavn og passord må fylles ut.");
      setLoading(false);
      return;
    }

    const adminUsername = import.meta.env.VITE_ADMIN_USERNAME;
    const adminPassword = import.meta.env.VITE_ADMIN_PASSWORD;
    const adminRole = import.meta.env.VITE_ADMIN_ROLE;

 

    try {
      const hashedInputPassword = await hashPassword(password);

    if (username === adminUsername && hashedInputPassword=== adminPassword) {
      dispatch(login({ username, role: adminRole, _uuid: "admin" }));
      navigate("/admin");
      setLoading(false);
      return;
    }

      const { data: users = [] } = await triggerGetUsers(); 
      const user = users.find(
        (u) => u.name === username && u.password === hashedInputPassword
      );

      if (user) {
        dispatch(login({ username: user.name, role: user.role, _uuid: user._uuid }));
        navigate("/user/my-cv/home");
      } else {
        setError("Feil brukernavn eller passord.");
      }
    } catch (error) {
      console.error("Feil ved innlogging:", error);
      setError("Kunne ikke logge inn. Prøv igjen.");
    } finally {
      setLoading(false);
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
      <button onClick={handleLogin} disabled={loading}>
        {loading ? "Logger inn..." : "Logg inn"}
      </button>
    </div>
  );
};

export default SignIn;





