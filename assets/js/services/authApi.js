import axios from "axios";
import JwtDecode from "jwt-decode";
import { API_LOGIN } from "../config";

function authentification(credentials) {
  return axios.post(API_LOGIN, credentials).then((response) => {
    axios.defaults.headers["Authorization"] = "Bearer " + response.data.token;
    window.localStorage.setItem("authToken", response.data.token);
    return true;
  });
}

function logOut() {
  window.localStorage.removeItem("authToken");
  delete axios.defaults.headers["Authorization"];
}

function setUp() {
  // je recupere le token stocké dans le navigateur
  const token = window.localStorage.getItem("authToken");
  if (token) {
    const jwt = JwtDecode(token);
    if (jwt.exp * 1000 > new Date().getTime()) {
      axios.defaults.headers["Authorization"] = "Bearer " + token;
      console.log("connexion successed with my friend axios");
    } else {
      console.log("token expireé , message depuis axios :)");
      logOut();
    }
  } else {
    console.log("token expireé , message depuis axios :)");
    logOut();
  }
}

function isAuth() {
  const token = window.localStorage.getItem("authToken");
  if (token) {
    const jwt = JwtDecode(token);
    if (jwt.exp * 1000 > new Date().getTime()) {
      console.log("connexion autorisé ");
      return true;
    }
    console.log("connexion non autorisé ");
    return false;
  }
  console.log("connexion non autorisé ");
  return false;
}

export default {
  authentification,
  logOut,
  setUp,
  isAuth,
};
