import axios from "axios";
import { API_INVOICE } from "../config";

function getInvoice() {
  return axios.get(API_INVOICE);
}

function deleteInvoice(id) {
  return axios
    .delete(API_INVOICE + "/" + id)
    .then((response) => console.log(response));
}

function makeInvoice(invoice) {
  return axios.post(API_INVOICE, invoice).then((response) => response.data);
}

function fetchInvoice(id) {
  return axios.get(API_INVOICE + "/" + id).then((response) => response.data);
}

function editInvoice(id, invoice) {
  return axios
    .put(API_INVOICE + "/" + id, invoice)
    .then((response) => response.data);
}

export default {
  getInvoice,
  delete: deleteInvoice,
  make: makeInvoice,
  fetchInvoice,
  editInvoice,
};
