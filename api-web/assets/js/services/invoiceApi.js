import axios from "axios";

function getInvoice() {
  return axios.get("http://127.0.0.1:8000/api/invoices");
}

function deleteInvoice(id) {
  return axios
    .delete("http://127.0.0.1:8000/api/invoices/" + id)
    .then((response) => console.log(response));
}

export default {
  getInvoice,
  delete: deleteInvoice,
};
