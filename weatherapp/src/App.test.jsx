import React from "react";
import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import Navbar from "./components/Navbar/Navbar";
import Breadcrumb from "./components/Breadcrumb/Breadcrumb";
import { ToastContainer } from "react-toastify";
import Previsoes from "./components/Previsoes/Previsoes";
import Form from "./components/Form/Form";
import { MemoryRouter, Routes, Route } from "react-router-dom";


beforeAll(() => {
  window.matchMedia =
    window.matchMedia ||
    function () {
      return {
        matches: false,
        addListener: function () {},
        removeListener: function () {},
      };
    };
});


describe("App", () => {
  test("deve renderizar a tela inicial", () => {
    const { getByText } = render(
      <MemoryRouter>
        <Navbar />
        <Breadcrumb />
        <ToastContainer />
        <Routes>
          <Route path="/" element={<Previsoes />} />
          <Route path="/cadastrar" element={<Form />} />
          <Route path="/editar/:id" element={<Form />} />
        </Routes>
      </MemoryRouter>
    );
    expect(getByText("Lista de Dados Meteorológicos")).toBeInTheDocument();
  });
});
