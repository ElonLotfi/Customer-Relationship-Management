import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import authApi from "../services/authApi";
import authContext from "../contexts/authContext";
import ToastField from "./forms/ToastField";

const nav = ({ history }) => {
  const { isAuth, setIsAuth } = useContext(authContext);

  const handleLogOut = () => {
    authApi.logOut();
    setIsAuth(false);
    ToastField.Toast("vous êtes déconnecté");
    history.push("/login");
  };

  return (
    <nav className="navbar navbar-dark navbar-expand-md fixed-top bg-dark">
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
                <button
                  onClick={handleLogOut}
                  className="btn btn-sm btn-danger"
                >
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
              <NavLink to="/login" className="btn btn-sm btn-success">
                Connexion
              </NavLink>
            </li>{" "}
            &nbsp
            <li className="nav-item">
              <NavLink to="/inscription" className="btn btn-sm btn-warning">
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
