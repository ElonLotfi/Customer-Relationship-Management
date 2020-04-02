import React from "react";

const Client = () => {
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
          <tr>
            <td>19</td>
            <td>
              <a>Lotfi mhamed</a>
            </td>
            <td>lotfi@med.fr</td>
            <td>lotfi Inc</td>
            <td className="text-center">
              <span className="badge badge-dark">3</span>
            </td>
            <td className="text-center">2 366.00 E</td>
            <td>
              <button className="btn btn-sm btn-danger">Supprimer</button>
            </td>
          </tr>
        </tbody>
      </table>
    </>
  );
};

export default Client;
