import React, { Component } from "react";

const nav = (props) => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <a className="navbar-brand" href="#">
        Application
      </a>
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

      <div className="collapse navbar-collapse" id="navbarColor01">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item">
            <a className="nav-link" href="http://127.0.0.1:8000/#/customer/">
              Clients
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="http://127.0.0.1:8000/#/invoice/">
              Factures
            </a>
          </li>
        </ul>
        <ul className="navbar-nav ml-auto">
          <li className="nav-item">
            <a href="#" className="btn btn-success">
              Connextion
            </a>
          </li>
          <li className="nav-item">
            <a href="#" className="nav-link">
              Inscription
            </a>
          </li>

          <li className="nav-item">
            <a href="#" className="btn btn-danger">
              Deconnexion
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default nav;
