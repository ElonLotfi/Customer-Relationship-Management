import React, { useState, useContext } from "react";
import authApi from "../services/authApi";
import authContext from "../contexts/authContext";

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
        <div className="form-group">
          <label htmlFor="username">Email address</label>
          <input
            value={credentials.username}
            type="email"
            name="username"
            className="form-control"
            id="username"
            aria-describedby="emailHelp"
            placeholder="Enter email"
            onChange={handlechange}
          />
          <small id="emailHelp" className="form-text text-muted">
            We'll never share your email with anyone else.
          </small>
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            value={credentials.password}
            name="password"
            type="password"
            className="form-control"
            id="password"
            placeholder="Password"
            onChange={handlechange}
          />
        </div>
        <button className="button btn-success">connexion</button>
      </form>
    </>
  );
};

export default Login;
