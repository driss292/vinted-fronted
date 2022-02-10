import { useState } from "react";
import Cookies from "react";
import axios from "axios";

const Signup = () => {
  const [data, setData] = useState();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const userInfos = {
        username: username,
        email: email,
        password: password,
        newsletter: true,
      };
      const response = await axios.post(
        "https://lereacteur-vinted-api.herokuapp.com/user/signup",
        userInfos
      );
      console.log(response.data);
      console.log(token);
      const token = response.data.token;
      Cookies.set("token", token);
    } catch (error) {
      console.log(error.response);
    }
  };

  return (
    <div className="signup-container">
      <h2>S'inscrire</h2>
      <form className="signup-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nom d'utilisateur"
          value={username}
          onChange={(event) => {
            const value = event.target.value;
            setUsername(value);
          }}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(event) => {
            const value = event.target.value;
            setEmail(value);
          }}
        />
        <input
          type="password"
          placeholder="Mot de passe"
          value={password}
          onChange={(event) => {
            const value = event.target.value;
            setPassword(value);
          }}
        />
        <input type="checkbox" />
        <button type="submit">S'inscrire</button>
      </form>
    </div>
  );
};
export default Signup;
