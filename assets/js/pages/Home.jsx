import React from "react";

const home = (props) => {
  return (
    <div className="jumbotron">
      <h1 className="display-3">Hello, world!</h1>
      <p className="lead">Développé par M'HAMED LOTFI</p>
      <hr className="my-4" />
      <p>Pour plus d'informations</p>
      <p className="lead">
        <a
          className="btn btn-primary btn-lg"
          href="https://github.com/JugheadTn"
          role="button"
        >
          mon Github
        </a>
      </p>
    </div>
  );
};

export default home;
