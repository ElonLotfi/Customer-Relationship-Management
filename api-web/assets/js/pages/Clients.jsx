import React, { useEffect, useState } from "react";
import {
  default as Pagination,
  default as pagination,
} from "../components/Pagination";
import clientApi from "../services/clientApi";

//table.table-hover pour creer le tableau
//thead>tr>th*7 pour creer l'entete de tableau
//tbody>tr>td*7 pour creer le body de tableauå

const Client = (props) => {
  const [customer, setCustomer] = useState([]);
  const [currentPage, setcurrentPage] = useState(1);
  const [search, setSearch] = useState("");

  const fetchCustomer = async () => {
    try {
      const data = await clientApi.findCustomers();
      setCustomer(data);
    } catch (error) {
      console.log(error.response);
    }
  };

  useEffect(() => {
    fetchCustomer();
  }, []);

  const handleDelete = async (id) => {
    const backup = [...customer];

    setCustomer(customer.filter((customer) => customer.id != id));
    try {
      await clientApi.deleteCustomer(id);
    } catch (error) {
      setCustomer(backup);
      console.log(error.response);
    }
  };

  // ici je dois creer les fonctions qui sert a gerer la pagination
  // 1 je calcul le nombre de page necessaire
  const itemPerPage = 8;

  const handleChangePage = (page) => {
    setcurrentPage(page);
  };

  // ici je dois filter les clients || Je montre que les clients dont j'ai besoin

  const handleSearch = (event) => {
    const listner = event.currentTarget.value;
    setSearch(listner);
    setcurrentPage(1);
  };
  const searchFiltred = customer.filter(
    (c) =>
      c.firstname.toLowerCase().includes(search.toLowerCase()) ||
      c.lastname.toLowerCase().includes(search.toLowerCase()) ||
      c.company.toLowerCase().includes(search.toLowerCase())
  );

  const customerPerPage = pagination.getData(
    searchFiltred,
    itemPerPage,
    currentPage
  );

  return (
    <>
      <h1>List des Clients</h1>

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
            <th>Id</th>
            <th>Client</th>
            <th>Email</th>
            <th>Entreprise</th>
            <th className="text-center">Factures</th>
            <th className="text-center">Montant total</th>
            <th />
          </tr>
        </thead>

        <tbody>
          {customerPerPage.map((customers) => (
            <tr key={customers.id}>
              <td>{customers.id}</td>
              <td>
                <a>
                  {customers.firstname} {customers.lastname}
                </a>
              </td>
              <td>{customers.email}</td>
              <td>{customers.company}</td>
              <td className="text-center">
                <span className="badge badge-dark">3</span>
              </td>
              <td className="text-center">
                {customers.totalAmount.toLocaleString()}
              </td>
              <td>
                <button
                  disabled={customers.invoices.length > 0}
                  className="btn btn-sm btn-danger"
                  onClick={() => handleDelete(customers.id)}
                >
                  Supprimer
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

export default Client;
