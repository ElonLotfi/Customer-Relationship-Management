import React, { useEffect, useState } from "react";
import Pagination from "../components/Pagination";
import invoiceApi from "../services/invoiceApi";

const INVOICE_STATUS = {
  PAID: "-success",
  CANCELED: "-danger",
  SENT: "-warning",
};

const factures = (props) => {
  const [invoice, setInvoice] = useState([]);
  const [currentPage, setcurrentPage] = useState(1);
  const [search, setSearch] = useState("");

  const fetchInvoices = async () => {
    try {
      const data = await invoiceApi
        .getInvoice()
        .then((response) => response.data["hydra:member"]);
      console.log(data);
      setInvoice(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchInvoices();
  }, []);

  const handleChangePage = (page) => {
    setcurrentPage(page);
  };

  // fonction sert a chercher une invoice
  const handleSearch = (event) => {
    const listner = event.currentTarget.value;
    setSearch(listner);
    console.log(search);
    setcurrentPage(1);
  };

  // Gestion de la recherche
  const searchFiltred = invoice.filter(
    (c) =>
      c.customer.firstname.toLowerCase().includes(search.toLowerCase()) ||
      c.customer.lastname.toLowerCase().includes(search.toLowerCase()) ||
      c.status.toLowerCase().startsWith(search.toLowerCase()) ||
      c.amount.toString().includes(search.toLowerCase()) ||
      c.chrono.toString().startsWith(search.toLowerCase())
  );

  const itemPerPage = 50;

  // Gestion de la Pagination
  const invoicePerPage = Pagination.getData(
    searchFiltred,
    itemPerPage,
    currentPage
  );

  // Gestion de supprision d'une invoice

  const handleDelete = async (id) => {
    const backup = [...invoice];
    setInvoice(invoice.filter((i) => i.id != id));
    try {
      await invoiceApi.delete(id);
    } catch (error) {
      setInvoice(backup);
      console.log(error.response);
    }
  };

  return (
    <>
      <h1>Les factures</h1>

      <form className="form-inline my-2 my-lg-0" className="center">
        <input
          className="form-control mr-sm-2"
          type="text"
          placeholder="Search"
          value={search}
          onChange={handleSearch}
        />
      </form>

      <table className="table table-hover">
        <thead>
          <tr>
            <th className="text-center">Numéro</th>
            <th>Montant</th>
            <th className="text-center">Date</th>
            <th className="text-center">Statut</th>
            <th>Client</th>
          </tr>
        </thead>

        <tbody>
          {invoicePerPage.map((invoice) => (
            <tr key={invoice.id}>
              <td className="text-center">{invoice.chrono}</td>
              <td>
                <a>{invoice.amount.toLocaleString() + " $"}</a>
              </td>
              <td className="text-center">
                {new Date(invoice.sentAt).toLocaleDateString()}
              </td>

              <td className="text-center">
                <span
                  className={"badge badge" + INVOICE_STATUS[invoice.status]}
                >
                  {invoice.status}
                </span>
              </td>

              <td>
                {invoice.customer.firstname} {invoice.customer.lastname}
              </td>
              <td>
                <button className="button btn-sm btn-succes">editer</button>{" "}
                <button
                  className="button btn-sm btn-danger"
                  onClick={() => handleDelete(invoice.id)}
                >
                  supprimer
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {searchFiltred.length > itemPerPage && (
        <Pagination
          currentPage={currentPage}
          customer={searchFiltred}
          handleChangePage={handleChangePage}
          itemPerPage={itemPerPage}
        />
      )}
    </>
  );
};

export default factures;
