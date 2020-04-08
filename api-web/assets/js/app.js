import React, { useState } from "react";
import ReactDOM from "react-dom";
import { HashRouter, Route, Switch, withRouter } from "react-router-dom";
import "../css/app.css";
import LoginRoute from "./components/LoginRoute";
import Navbar from "./components/Navbar";
import PrivateRoute from "./components/PrivateRoute";
import { default as AuthContext } from "./contexts/authContext";
import Clients from "./pages/Clients";
import Factures from "./pages/factures";
import Home from "./pages/Home";
import authApi from "./services/authApi";

const App = () => {
  // Hook de authentification
  const [isAuth, setIsAuth] = useState(authApi.isAuth());
  // pour donner au navbar les permission de switch router
  const NavBarWithRouter = withRouter(Navbar);
  authApi.setUp();

  // alimenter le contexte avec le hook qui le convient
  const contextValue = {
    isAuth,
    setIsAuth,
  };

  // creation d'une route pour les invoices et les customers

  // creation d'une route specifique pour la page de login

  return (
    <AuthContext.Provider value={contextValue}>
      <HashRouter>
        <NavBarWithRouter />

        <main className="container pt-5">
          <Switch>
            <LoginRoute path="/login"></LoginRoute>
            <PrivateRoute path="/invoice" component={Factures}></PrivateRoute>
            <PrivateRoute path="/customer" component={Clients}></PrivateRoute>
            <Route path="/" component={Home} />
          </Switch>
        </main>
      </HashRouter>
    </AuthContext.Provider>
  );
};
const rootElement = document.querySelector("#app");
ReactDOM.render(<App />, rootElement);
