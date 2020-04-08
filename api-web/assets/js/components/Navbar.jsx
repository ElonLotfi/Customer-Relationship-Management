import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import authApi from "../services/authApi";
import authContext from "../contexts/authContext";

const nav = ({ history }) => {
  const { isAuth, setIsAuth } = useContext(authContext);

  const handleLogOut = () => {
    authApi.logOut();
    setIsAuth(false);
    history.push("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <NavLink className="navbar-brand" to="/">
        Application
      </NavLink>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarColor01"
        aria-controls="navbarColor01"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      {(isAuth && (
        <>
          <div className="collapse navbar-collapse" id="navbarColor01">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                <NavLink className="nav-link" to="/customer">
                  Clients
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/invoice">
                  Factures
                </NavLink>
              </li>
            </ul>
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <button onClick={handleLogOut} className="btn btn-danger">
                  Deconnexion
                </button>
              </li>
            </ul>
          </div>
        </>
      )) || (
        <>
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <NavLink to="/login" className="btn btn-success">
                Connexion
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/" className="nav-link">
                Inscription
              </NavLink>
            </li>
          </ul>
        </>
      )}
    </nav>
  );
};

export default nav;
