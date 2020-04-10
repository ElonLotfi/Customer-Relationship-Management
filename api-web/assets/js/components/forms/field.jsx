import React from "react";

// TODO : On a besoin de Type , name , id , place Holder, onChange
const Field = ({
  value,
  type,
  name,
  id,
  placeholder,
  onChange = {},
  label,
  error,
}) => {
  return (
    <>
      <div className="form-group">
        <label htmlFor={name}>{label}</label>
        <input
          value={value}
          type={type}
          name={name}
          className={(!error && "form-control") || "form-control is-invalid"}
          id={id}
          aria-describedby="emailHelp"
          placeholder={placeholder}
          onChange={onChange}
        />
      </div>
      <small id={id + "Help"} className="text-danger">
        {error}
      </small>
    </>
  );
};

export default Field;
