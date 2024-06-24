import { describe, test, expect, vi } from "vitest";
import "@testing-library/jest-dom";
import { render, fireEvent, waitFor, within } from "@testing-library/react";
import axios from "axios";
import { BrowserRouter as Router } from "react-router-dom";
import moment from "moment";
import Form from "./index.jsx";

vi.mock("axios");

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
  axios.get.mockResolvedValueOnce({ data: mockData });
});

describe("Testes do componente Form", () => {
  test("deve enviar a previsão com sucesso", async () => {
    const { getByPlaceholderText, getByText, getByTestId, queryByText } =
      render(
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
    fireEvent.change(temperaturaMaxInput, { target: { value: 30 } });

    const temperaturaMinInput = getByTestId("minima-input");
    fireEvent.change(temperaturaMinInput, { target: { value: 20 } });

    const selectElement = getByTestId("custom-select");
    const selectHtmlElement = within(selectElement).getByRole("combobox");
    fireEvent.input(selectHtmlElement, { target: { value: "ENSOLARADO" } });

    const precipitacaoInput = getByTestId("precipitacao-input");
    fireEvent.change(precipitacaoInput, { target: { value: 0 } });

    const umidadeInput = getByTestId("umidade-input");
    fireEvent.change(umidadeInput, { target: { value: 60 } });

    const ventoInput = getByTestId("vento-input");
    fireEvent.change(ventoInput, { target: { value: 10 } });

    const submitButton = getByText("Salvar");
    fireEvent.click(submitButton);

    await waitFor(() => {
      const successMessage = queryByText("Dados enviados com sucesso!");
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

    const submitButton = getByText("Salvar");
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(getByText("Informe a cidade.")).toBeInTheDocument();
      expect(getByText("Informe a data.")).toBeInTheDocument();
      expect(getByText("Selecione um turno.")).toBeInTheDocument();
      expect(getByText("Informe a temperatura máxima.")).toBeInTheDocument();
      expect(getByText("Informe a temperatura mínima.")).toBeInTheDocument();
      expect(getByText("Informe o clima.")).toBeInTheDocument();
      expect(getByText("Informe a precipitação.")).toBeInTheDocument();
      expect(getByText("Informe a umidade.")).toBeInTheDocument();
      expect(getByText("Informe a velocidade do vento.")).toBeInTheDocument();
    });

    expect(axios.post).not.toHaveBeenCalled();
  });
});
