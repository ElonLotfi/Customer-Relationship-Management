import React from "react";

const Select = ({ name, error, children, value, onChange }) => {
  return (
    <>
      <div className="form-group">
        <label htmlFor="exampleSelect1">{name}</label>
        <select
          name={name}
          className={(!error && "form-control") || "form-control is-invalid"}
          id="exampleSelect1"
          value={value}
          onChange={onChange}
          className="form-control"
        >
          {children}
        </select>
      </div>
      <p className="invalid-feedback">{error}</p>
    </>
  );
};

export default Select;
