import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, test, expect } from "vitest";
import UpDownButton from "./index.jsx";

describe("Testes do componente UpDownButton", () => {
  test("deve renderizar corretamente", () => {
    render(<UpDownButton unit="°C" value={20} setValue={() => {}} isValid />);

    const inputElement = screen.getByDisplayValue("20");
    expect(inputElement).toBeInTheDocument();

    const unitElement = screen.getByText("°C");
    expect(unitElement).toBeInTheDocument();
  });

  test("deve incrementar o valor ao clicar no botão de cima", () => {
    let value = 10;
    const setValue = (newValue) => {
      value = newValue;
    };

    render(
      <UpDownButton unit="°C" value={value} setValue={setValue} isValid />
    );

    const upButton = screen.getByAltText("up");
    fireEvent.click(upButton);

    expect(value).toBe(11);
  });

  test("deve decrementar o valor ao clicar no botão de baixo", () => {
    let value = 10;
    const setValue = (newValue) => {
      value = newValue;
    };

    render(
      <UpDownButton unit="°C" value={value} setValue={setValue} isValid />
    );

    const downButton = screen.getByAltText("down");
    fireEvent.click(downButton);

    expect(value).toBe(9);
  });

  test("deve aceitar entrada válida no input", () => {
    let value = 10;
    const setValue = (newValue) => {
      value = newValue;
    };

    render(
      <UpDownButton unit="°C" value={value} setValue={setValue} isValid />
    );

    const inputElement = screen.getByDisplayValue("10");
    fireEvent.change(inputElement, { target: { value: "15" } });

    expect(value).toBe(15);
  });

  test("não deve aceitar entrada inválida no input", () => {
    let value = 10;
    const setValue = (newValue) => {
      value = newValue;
    };

    render(
      <UpDownButton unit="°C" value={value} setValue={setValue} isValid />
    );

    const inputElement = screen.getByDisplayValue("10");
    fireEvent.change(inputElement, { target: { value: "abc" } });

    expect(value).toBe(10);
  });
});
