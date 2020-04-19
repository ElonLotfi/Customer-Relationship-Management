import Axios from "axios";
import { API_USERS } from "./config";
function addUser(user) {
  Axios.post("https://mhamed-app.herokuapp.com/api/", user).then(
    (response) => response.data
  );
}

export default {
  addUser,
};
