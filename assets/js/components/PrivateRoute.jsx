import React, { useContext } from "react";
import authContext from "../contexts/authContext";
import { Route, Redirect } from "react-router-dom";

const PrivateRoute = ({ path, component }) => {
  const { isAuth } = useContext(authContext);
  return isAuth ? (
    <Route path={path} component={component}></Route>
  ) : (
    <Redirect to="/"></Redirect>
  );
};

export default PrivateRoute;
