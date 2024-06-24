import "@testing-library/jest-dom";
import { describe, expect, test } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import axios from "axios";
import Previsoes from "./index";
import Form from "../Form";
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

vi.mock("axios");

describe("Testes do componente Previsoes", () => {
  const mockDados = [
    {
      id: 1,
      dataCadastro: "2023-06-01",
      nomeCidade: "São Paulo",
      temperaturaMaxima: 30,
      temperaturaMinima: 20,
      previsaoTempo: "Ensolarado",
      previsaoTurno: ["TARDE"],
      precipitacao: 0,
      umidade: 60,
      velocidadeDoVento: 10,
    },
    {
      id: 2,
      dataCadastro: "2023-06-02",
      nomeCidade: "Rio de Janeiro",
      temperaturaMaxima: 28,
      temperaturaMinima: 22,
      previsaoTempo: "Parcialmente Nublado",
      previsaoTurno: "NOITE",
      precipitacao: 5,
      umidade: 65,
      velocidadeDoVento: 15,
    },
  ];

  beforeEach(() => {
    axios.get.mockResolvedValue({ data: mockDados });
  });

  test("Exibir lista de previsões meteorológicas", async () => {
    render(
      <MemoryRouter>
        <Previsoes />
      </MemoryRouter>
    );

    const saoPauloRow = await screen.findByText("São Paulo");
    expect(saoPauloRow).toBeInTheDocument();

    const rioDeJaneiroRow = await screen.findByText("Rio de Janeiro");
    expect(rioDeJaneiroRow).toBeInTheDocument();
  });

  test("Buscar por cidade", async () => {
    render(
      <MemoryRouter>
        <Previsoes />
      </MemoryRouter>
    );

    const searchInput = screen.getByPlaceholderText("Digite o nome da cidade");
    fireEvent.change(searchInput, { target: { value: "Rio" } });

    const rioDeJaneiroRow = await screen.findByText("Rio de Janeiro");
    expect(rioDeJaneiroRow).toBeInTheDocument();
  });

  test("Editar registro", async () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <Routes>
          <Route path="/" element={<Previsoes />} />
          <Route path="/editar/:id" element={<Form />} />
        </Routes>
      </MemoryRouter>
    );

    const editButton = await screen.findAllByText("Editar");
    fireEvent.click(editButton[0]);

    await waitFor(() => {
      expect(
        screen.getByText("Editar Dados Meteorológicos")
      ).toBeInTheDocument();
    });
  });

  test("Excluir registro", async () => {
    render(
      <MemoryRouter>
        <Previsoes />
      </MemoryRouter>
    );

    axios.delete.mockResolvedValueOnce();

    const deleteButtons = await screen.findAllByText("Excluir");

    fireEvent.click(deleteButtons[0]);

    const confirmButton = await screen.findByText("Confirmar Exclusão");
    fireEvent.click(confirmButton);

    axios.get.mockResolvedValueOnce({ data: [mockDados[1]] });

    const remainingDeleteButton = await screen.findByText("Excluir");
    fireEvent.click(remainingDeleteButton);

    const confirmButtonAgain = await screen.findByText("Confirmar Exclusão");
    fireEvent.click(confirmButtonAgain);

    axios.get.mockResolvedValueOnce({ data: [] });

    const noDataMessage = await screen.findByText("Não há dados cadastrados");
    expect(noDataMessage).toBeInTheDocument();
  });
});
