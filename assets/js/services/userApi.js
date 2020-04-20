import Axios from "axios";
import { API_USERS } from "../config";
function addUser(user) {
  return Axios.post(API_USERS, user).then((response) => response.data);
}

export default {
  addUser,
};
