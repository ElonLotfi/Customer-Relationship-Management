import axios from "axios";

function findCustomers() {
  return axios
    .get("http://127.0.0.1:8000/api/customers/")
    .then((response) => response.data["hydra:member"]);
}

function deleteCustomer(id) {
  return axios
    .delete("http://127.0.0.1:8000/api/customers/" + id)
    .then((response) =>
      console.log(response.status + "client supprimer avec success")
    );
}

function addCustomer(customer) {
  return axios.post("http://localhost:8000/api/customers", customer);
}

function fetchCustomer(id) {
  return axios
    .get("http://localhost:8000/api/customers/" + id)
    .then((response) => response.data);
}

function editCustomer(id, customer) {
  return axios
    .put("http://localhost:8000/api/customers/" + id, customer)
    .then((response) => response.data);
}

export default {
  findCustomers,
  deleteCustomer,
  addCustomer,
  fetchCustomer,
  editCustomer,
};
