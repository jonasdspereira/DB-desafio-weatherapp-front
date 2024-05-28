import React from "react";
import "./style.css";

const Breadcrumb = () => {
  return (
    <div className="breadcrumb">
      <ul>
        <li>Inicio</li>
        <li className="current">Cadastro de dados metereológicos</li>
      </ul>
    </div>
  );
};

export default Breadcrumb;
