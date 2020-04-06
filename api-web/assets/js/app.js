import React from "react";
import ReactDOM from "react-dom";
import { HashRouter, Route, Switch } from "react-router-dom";
import "../css/app.css";
import Navbar from "./components/Navbar";
import Clients from "./pages/Clients";
import Factures from "./pages/factures";
import Home from "./pages/Home";

// Need jQuery? Install it with "yarn add jquery", then uncomment to import it.
// import $ from 'jquery';
const App = () => {
  return (
    <HashRouter>
      <Navbar />

      <main className="container pt-5">
        <Switch>
          <Route path="/invoice" component={Factures}></Route>

          <Route path="/customer" component={Clients}></Route>
          <Route path="/" component={Home} />
        </Switch>
      </main>
    </HashRouter>
  );
};
const rootElement = document.querySelector("#app");
ReactDOM.render(<App />, rootElement);
