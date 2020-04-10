import React, { useContext, useState } from "react";
import Field from "../components/forms/field";
import authContext from "../contexts/authContext";
import authApi from "../services/authApi";

// je recupere les donnee depuis le formulaire
// j'envoie les donne a axios et je recupere le token

const Login = ({ history }) => {
  const { isAuth, setIsAuth } = useContext(authContext);

  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const handlechange = (event) => {
    const { value, name } = event.currentTarget;
    setCredentials({ ...credentials, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault(); // pour ne pas recharger la page
    //console.log(credentials);
    try {
      await authApi.authentification({
        username: credentials.username,
        password: credentials.password,
      });
      setIsAuth(true);
      history.replace("/");
    } catch (error) {
      console.log("error");
    }
  };

  return (
    <>
      <h1>Page de connexion</h1>
      <form onSubmit={handleSubmit}>
        <Field
          value={credentials.username}
          type="email"
          name="username"
          id="username"
          placeholder="Enter email"
          onChange={handlechange}
          label="Email address"
        />

        <Field
          value={credentials.password}
          name="password"
          type="password"
          id="password"
          placeholder="Password"
          onChange={handlechange}
          label="Mot de passe"
        />

        <button className="button btn-success">connexion</button>
      </form>
    </>
  );
};

export default Login;
