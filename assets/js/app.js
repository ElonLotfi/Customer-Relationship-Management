import React, { useState } from "react";
import ReactDOM from "react-dom";
import { HashRouter, Route, Switch, withRouter } from "react-router-dom";
import LoginRoute from "./components/LoginRoute";
import Navbar from "./components/Navbar";
import PrivateRoute from "./components/PrivateRoute";
import { default as AuthContext } from "./contexts/authContext";
import Client from "./pages/Client";
import Clients from "./pages/Clients";
import facture from "./pages/Facture";
import Factures from "./pages/Factures";
import Home from "./pages/Home";
import authApi from "./services/authApi";
import InscriptionRoute from "./components/InscriptionRoute";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
            <InscriptionRoute path="/inscription"></InscriptionRoute>

            <PrivateRoute
              path="/invoice/:id"
              component={facture}
            ></PrivateRoute>

            <LoginRoute path="/login"></LoginRoute>
            <PrivateRoute
              path="/customer/:id"
              component={Client}
            ></PrivateRoute>
            <PrivateRoute path="/invoice" component={Factures}></PrivateRoute>
            <PrivateRoute path="/customer" component={Clients}></PrivateRoute>
            <Route path="/" component={Home} />
          </Switch>
        </main>
      </HashRouter>
      <ToastContainer></ToastContainer>
    </AuthContext.Provider>
  );
};
const rootElement = document.querySelector("#app");
ReactDOM.render(<App />, rootElement);
