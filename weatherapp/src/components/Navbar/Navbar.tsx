import React from "react";
import logo from "./logo-db.png";
import "./style.css";

const Navbar: React.FC = () => {
  return (
    <nav className="navbar">
      <a href="#"></a>
      <img src={logo} className="logo" alt="logo db" />
      <ul className="nav-links">
        <li>
          <a href="/">Previsões</a>
        </li>
        <li>
          <a href="/cadastrar">Cadastrar Previsão</a>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;

