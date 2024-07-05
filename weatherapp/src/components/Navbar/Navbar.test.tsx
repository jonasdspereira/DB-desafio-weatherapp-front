import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import Navbar from "./index"; 
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";

describe("Testes do componente Navbar", () => {
  it("deve renderizar o logo na navbar", () => {
    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    );

    const logoElement = screen.getByAltText(/logo db/i);
    expect(logoElement).toBeInTheDocument();

    expect(logoElement).toHaveAttribute("src", "/src/components/Navbar/logo-db.png");
  });
});
