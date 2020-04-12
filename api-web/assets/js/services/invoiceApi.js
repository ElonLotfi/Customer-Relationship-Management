import axios from "axios";

function getInvoice() {
  return axios.get("http://127.0.0.1:8000/api/invoices");
}

function deleteInvoice(id) {
  return axios
    .delete("http://127.0.0.1:8000/api/invoices/" + id)
    .then(response => console.log(response));
}

function makeInvoice(invoice) {
  return axios.post("http://127.0.0.1:8000/api/invoices", invoice);
}

function fetchInvoice(id) {
  return axios
    .get("http://127.0.0.1:8000/api/invoices/" + id)
    .then(response => response.data);
}

function editInvoice(id, invoice) {
  return axios
    .put("http://127.0.0.1:8000/api/invoices/" + id, invoice)
    .then(response => response.data);
}

export default {
  getInvoice,
  delete: deleteInvoice,
  make: makeInvoice,
  fetchInvoice,
  editInvoice
};
