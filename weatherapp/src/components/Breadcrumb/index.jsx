import React from "react";
import { useLocation } from "react-router-dom";
import "./style.css";

const Breadcrumb = () => {
  const location = useLocation();

  const getCurrentPage = () => {
    if (location.pathname.startsWith("/editar/")) {
      return `Editar dados meteorológicos`;
    }
    switch (location.pathname) {
      case "/":
        return "Lista de dados meteorológicos ";
      case "/cadastro":
        return "Cadastro de dados meteorológicos";
      default:
        return "Página Desconhecida";
    }
  };

  return (
    <div className="breadcrumb">
      <ul>
        <li>Inicio</li>
        <li className="current">{getCurrentPage()}</li>
      </ul>
    </div>
  );
};

export default Breadcrumb;
