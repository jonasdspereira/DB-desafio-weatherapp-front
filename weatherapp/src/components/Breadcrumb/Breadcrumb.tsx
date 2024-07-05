import React, { FC } from 'react';
import { useLocation } from "react-router-dom";
import "./style.css";

const Breadcrumb: FC = () => {
  const location = useLocation();

  const getCurrentPage = (): string => {
    if (location.pathname.startsWith("/editar/")) {
      return `Editar dados meteorológicos`;
    }
    switch (location.pathname) {
      case "/":
        return "Lista de dados meteorológicos";
      case "/cadastrar":
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
