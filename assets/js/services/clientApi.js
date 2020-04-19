import axios from "axios";
import { API_CUSTOMER } from "../config";

function findCustomers() {
  return axios
    .get(API_CUSTOMER)
    .then((response) => response.data["hydra:member"]);
}

function deleteCustomer(id) {
  return axios
    .delete(API_CUSTOMER + "/" + id)
    .then((response) =>
      console.log(response.status + "client supprimer avec success")
    );
}

function addCustomer(customer) {
  return axios.post(API_CUSTOMER, customer);
}

function fetchCustomer(id) {
  return axios.get(API_CUSTOMER + "/" + id).then((response) => response.data);
}

function editCustomer(id, customer) {
  return axios
    .put(API_CUSTOMER + "/" + id, customer)
    .then((response) => response.data);
}

export default {
  findCustomers,
  deleteCustomer,
  addCustomer,
  fetchCustomer,
  editCustomer,
};
