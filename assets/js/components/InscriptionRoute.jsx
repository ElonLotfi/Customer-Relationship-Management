import React, { useContext } from "react";
import authContext from "../contexts/authContext";
import { Redirect, Route } from "react-router-dom";
import Inscription from "../pages/Inscription";

const InscriptionRoute = ({ path }) => {
  const { isAuth } = useContext(authContext);

  return isAuth ? (
    <Redirect to="/"></Redirect>
  ) : (
    <Route
      path={path}
      render={props => <Inscription {...props}></Inscription>}
    ></Route>
  );
};

export default InscriptionRoute;
