import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import Turno from "./index.jsx";
import { describe, test, expect } from "vitest";

describe("Turno Component", () => {
  test("deve renderizar os botões de turno", () => {
    render(<Turno setTurno={vi.fn()} invalid={false} />);

    const manhaButton = screen.getByText("MANHA");
    const tardeButton = screen.getByText("TARDE");
    const noiteButton = screen.getByText("NOITE");

    expect(manhaButton).toBeInTheDocument();
    expect(tardeButton).toBeInTheDocument();
    expect(noiteButton).toBeInTheDocument();
  });

  test("deve atualizar a seleção de turno ao clicar em um botão", () => {
    const setTurnoMock = vi.fn();
    render(<Turno setTurno={setTurnoMock} invalid={false} />);

    const manhaButton = screen.getByText("MANHA");
    const tardeButton = screen.getByText("TARDE");
    const noiteButton = screen.getByText("NOITE");

    fireEvent.click(manhaButton);
    expect(manhaButton).toHaveClass("selected");
    expect(setTurnoMock).toHaveBeenCalledWith("MANHA");

    fireEvent.click(tardeButton);
    expect(tardeButton).toHaveClass("selected");
    expect(manhaButton).not.toHaveClass("selected");
    expect(setTurnoMock).toHaveBeenCalledWith("TARDE");

    fireEvent.click(noiteButton);
    expect(noiteButton).toHaveClass("selected");
    expect(tardeButton).not.toHaveClass("selected");
    expect(setTurnoMock).toHaveBeenCalledWith("NOITE");
  });

  test("deve aplicar a classe 'invalid' quando a prop invalid for true", () => {
    render(<Turno setTurno={vi.fn()} invalid={true} />);

    const manhaButton = screen.getByText("MANHA");
    const tardeButton = screen.getByText("TARDE");
    const noiteButton = screen.getByText("NOITE");

    expect(manhaButton).toHaveClass("invalid");
    expect(tardeButton).toHaveClass("invalid");
    expect(noiteButton).toHaveClass("invalid");
  });
});
