import React, { useContext } from "react";
import authContext from "../contexts/authContext";
import { Redirect, Route } from "react-router-dom";
import LoginPage from "../pages/LoginPage";

const LoginRoute = ({ path }) => {
  const { isAuth } = useContext(authContext);

  return isAuth ? (
    <Redirect to="/"></Redirect>
  ) : (
    <Route
      path={path}
      render={(props) => <LoginPage {...props}></LoginPage>}
    ></Route>
  );
};

export default LoginRoute;
