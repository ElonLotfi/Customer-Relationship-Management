import React, { useState, useEffect } from "react";
import axios from "axios";

//table.table-hover pour creer le tableau
//thead>tr>th*7 pour creer l'entete de tableau
//tbody>tr>td*7 pour creer le body de tableau

const Client = props => {
  const [customer, setCustomer] = useState([]);
  useEffect(() => {
    axios
      .get("https://127.0.0.1:8000/api/customers")
      .then(response => response.data["hydra:member"])
      .then(data => setCustomer(data))
      .catch(error => console.log(error.response));
  }, []);

  return (
    <>
      <h1>List des Clients</h1>

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
          {customer.map(customers => (
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
                <button className="btn btn-sm btn-danger">Supprimer</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default Client;
