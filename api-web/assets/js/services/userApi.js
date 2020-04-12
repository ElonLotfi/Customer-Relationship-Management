import Axios from "axios";

function addUser(user) {
  Axios.post("http://127.0.0.1:8000/api/users", user).then(
    response => response.data
  );
}

export default {
  addUser
};
