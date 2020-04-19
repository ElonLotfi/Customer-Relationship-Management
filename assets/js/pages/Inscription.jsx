import React, { useState } from "react";
import Field from "../components/forms/field";
import userApi from "../services/userApi";

const inscription = ({ history }) => {
  const [i, setI] = useState({
    email: "",
    password: "",
    firstname: "",
    lastname: "",
  });

  const handlechange = (event) => {
    const { name, value } = event.currentTarget;
    setI({ ...i, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const data = await userApi.addUser(i);
      history.replace("/login");
    } catch (error) {
      console.log(error.response);
    }
  };

  return (
    <>
      <h1>Inscription</h1>

      <form onSubmit={handleSubmit}>
        <Field
          value={i.email}
          type="email"
          name="email"
          id="email"
          placeholder="Enter email"
          onChange={handlechange}
          label=""
        />
        <Field
          value={i.password}
          type="password"
          name="password"
          id="password"
          placeholder="Enter password"
          onChange={handlechange}
          label=""
        />

        <Field
          value={i.firstname}
          type="firstname"
          name="firstname"
          id="firstname"
          placeholder="firstname"
          onChange={handlechange}
          label=""
        />
        <Field
          value={i.lastname}
          type="lastname"
          name="lastname"
          id="lastname"
          placeholder="lastname"
          onChange={handlechange}
          label=""
        />
        <button className="button btn-success">je m'inscris</button>
      </form>
    </>
  );
};

export default inscription;
