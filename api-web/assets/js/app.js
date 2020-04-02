import React from "react";
import ReactDOM from "react-dom";
import Navbar from "./components/Navbar";
import "../css/app.css";
import Home from "./pages/Home";
import { HashRouter, Route, Switch } from "react-router-dom";
import Clients from "./pages/Clients";

// Need jQuery? Install it with "yarn add jquery", then uncomment to import it.
// import $ from 'jquery';
const App = () => {
  return (
    <HashRouter>
      <Navbar />

      <main className="container pt-5">
        <Switch>
          <Route path="/customers" component={Clients}></Route>
          <Route path="/" component={Home} />
        </Switch>
      </main>
    </HashRouter>
  );
};
const rootElement = document.querySelector("#app");
ReactDOM.render(<App />, rootElement);
