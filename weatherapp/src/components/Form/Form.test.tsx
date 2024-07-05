import React from "react";
import "@testing-library/jest-dom";
import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import axios from "axios";
import { BrowserRouter as Router } from "react-router-dom";
import moment from "moment";
import { describe, test, expect, vi } from "vitest";
<<<<<<< HEAD:weatherapp/src/components/Form/Form.test.tsx
import Form from "./Form.js";
=======
import userEvent from "@testing-library/user-event";
import Form from "./index.jsx";
>>>>>>> parent of 0cfd57f (implementando testes unitarios):weatherapp/src/components/Form/Form.test.jsx

vi.mock("axios");

describe("Testes do componente Form", () => {
  const mockAPIUrl = "http://mockapi.com";
  const dateFormatList = "DD/MM/YYYY";

  const mockData = {
    id: 1,
    nomeCidade: "São Paulo",
    dataCadastro: "01/06/2023",
    previsaoTurno: "TARDE",
    previsaoTempo: "ENSOLARADO",
    temperaturaMaxima: 30,
    temperaturaMinima: 20,
    precipitacao: 0,
    umidade: 60,
    velocidadeDoVento: 10,
  };

  beforeEach(() => {
    axios.get = vi.fn().mockResolvedValue({ data: mockData });
    axios.post = vi.fn().mockResolvedValue({ data: { message: "Dados enviados com sucesso!" } });
  });

  test("deve enviar a previsão com sucesso", async () => {
    const { getByPlaceholderText, getByText, getByTestId, getByRole } = render(
      <Router>
        <Form />
      </Router>
    );

    const cidadeInput = getByPlaceholderText("Busque por uma cidade");
    fireEvent.change(cidadeInput, { target: { value: "São Paulo" } });

    const dataInput = getByPlaceholderText("Selecione a data");
    const selectedDate = moment("01/06/2023", dateFormatList);
    fireEvent.change(dataInput, {
      target: { value: selectedDate.format(dateFormatList) },
    });

    const turnoButton = getByText("TARDE");
    fireEvent.click(turnoButton);

    const temperaturaMaxInput = getByTestId("maxima-input");
    fireEvent.change(temperaturaMaxInput, { target: { value: "30" } });

    const temperaturaMinInput = getByTestId("minima-input");
    fireEvent.change(temperaturaMinInput, { target: { value: "20" } });

    // Abre o dropdown do select
    const selectElement = screen.getByTestId("custom-select");
    fireEvent.click(selectElement);

    // Aguarda e seleciona a opção "ENSOLARADO"
    await waitFor(() => {
      const optionEnsolarado = screen.getByText("ENSOLARADO");
      fireEvent.click(optionEnsolarado);
    });
    const precipitacaoInput = getByTestId("precipitacao-input");
    fireEvent.change(precipitacaoInput, { target: { value: "0" } });

    const umidadeInput = getByTestId("umidade-input");
    fireEvent.change(umidadeInput, { target: { value: "60" } });

    const ventoInput = getByTestId("vento-input");
    fireEvent.change(ventoInput, { target: { value: "10" } });

    const submitButton = getByText("Salvar");
    fireEvent.click(submitButton);

    await waitFor(() => {
      const successMessage = getByText("Dados enviados com sucesso!");
      expect(successMessage).toBeInTheDocument();
    });

    expect(axios.post).toHaveBeenCalledWith(
      `${mockAPIUrl}/previsoes`,
      {
        nomeCidade: "São Paulo",
        dataCadastro: "01/06/2023",
        previsaoTurno: "TARDE",
        previsaoTempo: "ENSOLARADO",
        temperaturaMaxima: 30,
        temperaturaMinima: 20,
        precipitacao: 0,
        umidade: 60,
        velocidadeDoVento: 10,
      },
      expect.any(Object)
    );
  });

  test("deve mostrar mensagem de erro", async () => {
    const { getByText } = render(
      <Router>
        <Form />
      </Router>
    );

    // Submete o formulário sem preencher os campos obrigatórios
    const submitButton = getByText("Salvar");
    fireEvent.click(submitButton);

    // Aguarda as mensagens de erro
    await waitFor(() => {
      const cidadeError = getByText("Informe a cidade.");
      expect(cidadeError).toBeInTheDocument();

      const dataError = getByText("Informe a data.");
      expect(dataError).toBeInTheDocument();

      const turnoError = getByText("Selecione um turno.");
      expect(turnoError).toBeInTheDocument();

      const temperaturaMaxError = getByText("Informe a temperatura máxima.");
      expect(temperaturaMaxError).toBeInTheDocument();

      const temperaturaMinError = getByText("Informe a temperatura mínima.");
      expect(temperaturaMinError).toBeInTheDocument();

      const climaError = getByText("Informe o clima.");
      expect(climaError).toBeInTheDocument();

      const precipitacaoError = getByText("Informe a precipitação.");
      expect(precipitacaoError).toBeInTheDocument();

      const umidadeError = getByText("Informe a umidade.");
      expect(umidadeError).toBeInTheDocument();

      const ventoError = getByText("Informe a velocidade do vento.");
      expect(ventoError).toBeInTheDocument();
    });

    // Verifica que a requisição não foi feita
    expect(axios.post).not.toHaveBeenCalled();
  });
});
