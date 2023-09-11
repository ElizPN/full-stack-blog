import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const logIn = async () => {
    try {
      await signInWithEmailAndPassword(getAuth(), email, password);
      navigate("/articles");
    } catch (error) {
      console.log(error.message);
      setError(error.message);
    }
  };

  return (
    <>
      <h1>Login</h1>
      {error && <p className="error">{error}</p>}
      <input value={email} onChange={e => setEmail(e.target.value)} />
      <input
        type="password"
        value={password}
        onChange={e => setPassword(e.target.value)}
      />
      <button onClick={logIn}>Log In</button>
      <Link to={"/create-account"}>Do not have account? Crate one here</Link>
    </>
  );
};
export default LoginPage;
