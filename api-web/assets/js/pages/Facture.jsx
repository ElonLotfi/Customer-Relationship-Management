import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Field from "../components/forms/field";
import Select from "../components/forms/Select";
import clientApi from "../services/clientApi";
import invoiceApi from "../services/invoiceApi";

const facture = ({ match, history }) => {
  // pour recuper l'id
  const index = match.params.id;
  const [edit, setEdit] = useState(false);
  const [c, setC] = useState([]);

  // pour gerer la facture
  const [invoice, setInvoice] = useState({
    amount: "",
    customer: "",
    status: "",
    sentAt: new Date().toLocaleDateString()
  });
  // recuprer l'invoice en cas d'edition
  useEffect(() => {
    if (index !== "New") {
      setEdit(true);
      fetchInv(index);
    }
  }, [index]);

  // recuperer le customer en cas d'edition
  useEffect(() => {
    if (edit) {
      fetchOneCustomer(invoice.customer);
    } else {
      fetchManyCustomer();
    }
  }, [invoice]);

  // pour gerer les erreurs
  const [error, setError] = useState({
    amount: "",
    status: "",
    customer: ""
  });

  // gerer la modification

  const fetchInv = async () => {
    try {
      const data = await invoiceApi.fetchInvoice(index);

      const { amount, status, customer, sentAt } = data;
      setInvoice({
        amount,
        status,
        customer: customer.id,
        sentAt: new Date()
      });
    } catch (error) {
      console.log(error.response);
    }
  };

  // recuperer la liste des clients || pour les choix
  const fetchManyCustomer = async () => {
    console.log("many");
    try {
      const data = await clientApi.findCustomers();
      setC(data);
    } catch (error) {
      console.log(error.response);
    }
  };

  // recuperer un client , en cas d'edition de facture
  const fetchOneCustomer = async index => {
    console.log("one");

    try {
      const toto = await clientApi.fetchCustomer(index);
      setC(toto);
    } catch (error) {
      console.log(error.response);
    }
  };

  // recuperer les donnés de chaque field
  const onChange = event => {
    const { name, value } = event.currentTarget;
    setInvoice({ ...invoice, [name]: value });
    //console.log(invoice);
  };

  // valider le formulaire
  const handleSubmit = async event => {
    event.preventDefault();
    //console.log(invoice);
    try {
      if (edit) {
        const data = await invoiceApi.editInvoice(index, {
          ...invoice,
          customer: `/api/customers/${invoice.customer}`
        });
        history.replace("/invoice");

        //console.log(data);
      } else {
        // TODO :: le probleme se trouve ici
        //console.log(invoice);
        //console.log(c);
        const data = await invoiceApi.make({
          ...invoice,
          customer: `/api/customers/${invoice.customer}`,
          sentAt: new Date()
        });
        console.log(data);
        history.replace("/invoice");
      }
      setError({});
    } catch (error) {
      console.log(error.response);
    }
  };

  return (
    <>
      {!edit ? <h1>Ajouter une facture</h1> : <h1>Editer une facture</h1>}

      <div className="float-right ml-auto mb-3">
        <Link to="/invoice" className="button btn-sm btn-success">
          mes factures
        </Link>
      </div>
      <form onSubmit={handleSubmit}>
        <Field
          value={invoice.amount}
          type="number"
          name="amount"
          id="amount"
          placeholder="montant ..."
          onChange={onChange}
          label=""
          error={error.amount}
        />

        <Select
          name="status"
          error={error.status}
          value={invoice.status}
          onChange={onChange}
        >
          <option></option>
          <option name="status" value="SENT">
            SENT
          </option>
          <option value="PAID">PAID</option>
          <option value="CANCELED">CANCELED</option>
        </Select>

        <Select
          name="customer"
          error={error.customer}
          value={invoice.customer}
          onChange={onChange}
        >
          <option></option>
          {edit ? (
            <option value={c.id}>
              {c.firstname} {c.lastname}
            </option>
          ) : (
            c.map(i => {
              return (
                <option value={i.id} key={i.id}>
                  {i.firstname} {i.lastname}
                </option>
              );
            })
          )}
        </Select>

        <button className="button btn-success">
          {edit ? "Editer" : "Ajouter"}
        </button>
      </form>
    </>
  );
};

export default facture;
