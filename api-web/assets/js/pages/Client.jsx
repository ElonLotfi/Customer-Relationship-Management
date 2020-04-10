import React, { useState, Toast, useEffect } from "react";
import Field from "../components/forms/field";
import clientApi from "../services/clientApi";
import { Link } from "react-router-dom";

//firstname , lastname, email , company , user
const client = (props) => {
  // pour recuperer l'id de customers
  const id = props.match.params.id;

  // gestion d'etat de customer
  const [newC, setNewC] = useState({
    firstname: "",
    lastname: "",
    email: "",
    company: "",
  });

  // gestion d'etat d'erreurs
  const [errors, setError] = useState({
    firstname: "",
    lastname: "",
    email: "",
    company: "",
  });
  // pour connaitre si on est entrain d'editer un client ou de creer un autre
  const [edit, setEdit] = useState(false);
  const [toast, setToast] = useState(false);
  //TODO : useEffect pour choisir soit on va editer un customer ou creer un nouveau

  const lookCustomer = async () => {
    try {
      const data = await clientApi.fetchCustomer(id);
      const { firstname, lastname, email, company } = data;
      setNewC({ firstname, lastname, email, company });
    } catch (error) {
      console.log(error.response.data);
    }
  };

  useEffect(() => {
    if (id != "new") {
      setEdit(true);
      lookCustomer();
      // je cherche le client concerneé par la modification
    }
  }, [id]);

  // envoyer le formulaire
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      if (edit) {
        await clientApi.editCustomer(id, newC);
        props.history.replace("/customer");
      } else {
        await clientApi.addCustomer(newC);
        props.history.replace("/customer");
      }
      setToast(true);
      setError({});
    } catch (error) {
      const data = [...error.response.data.violations];

      if (data) {
        const apiError = {};

        data.map((index) => {
          //console.log(index);

          apiError[index.propertyPath] = index.message;
        });
        setError(apiError);
        setToast(false);
      }
    }
  };

  const onChange = (event) => {
    const { name, value } = event.currentTarget;
    setNewC({ ...newC, [name]: value });
  };

  return (
    <>
      {edit ? <h1> editer le client</h1> : <h1>Ajouter un client</h1>}
      <div className="float-right ml-auto mb-3">
        <Link to="/customer" className="button btn-sm btn-success">
          Mes clients
        </Link>
      </div>
      <form onSubmit={handleSubmit}>
        <Field
          value={newC.firstname}
          type="text"
          name="firstname"
          id="firstname"
          placeholder="firstname"
          label=""
          onChange={onChange}
          error={errors.firstname}
        />
        <Field
          value={newC.lastname}
          type="text"
          name="lastname"
          id="lastname"
          placeholder="lastname"
          label=""
          onChange={onChange}
          error={errors.lastname}
        />
        <Field
          value={newC.email}
          type="email"
          name="email"
          id="email"
          placeholder="email"
          label=""
          onChange={onChange}
          error={errors.email}
        />

        <Field
          value={newC.company}
          type="text"
          name="company"
          id="company"
          placeholder="company"
          label=""
          onChange={onChange}
          error={errors.company}
        />
        <button className="button btn-success">
          {edit ? "Modifier" : "Ajouter"}
        </button>
      </form>
      {toast && (
        <div className="float-right ml-auto mb-3">
          <h2>{edit ? "customer edité" : "customer ajouté"}</h2>
        </div>
      )}
    </>
  );
};

export default client;
