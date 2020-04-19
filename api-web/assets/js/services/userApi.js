import Axios from "axios";
import { API_USERS } from "./config";
function addUser(user) {
  Axios.post(API_USERS, user).then((response) => response.data);
}

export default {
  addUser,
};
