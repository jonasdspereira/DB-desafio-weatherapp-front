import React, { useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import { showToast } from "./Toast";
import axios from "axios";
import "./style.css";
import UpDownButton from "../UpDownButton";
import { DatePicker } from "antd";
import Turno from "../Turno";

const Form = () => {
  const API_URL = process.env.REACT_APP_API_URL;

  const dateFormatList = "DD-MM-YYYY";

  const [cidadeInput, setCidadeInput] = useState("");
  const [data, setData] = useState(null);
  const [temperaturaMax, setTemperaturaMax] = useState(0);
  const [temperaturaMin, setTemperaturaMin] = useState(0);
  const [precipitacao, setPrecipitacao] = useState(0);
  const [umidade, setUmidade] = useState(0);
  const [vento, setVento] = useState(0);
  const [clima, setClima] = useState("Selecione a opção");
  const [turno, setTurno] = useState(null);

  const [cidadeInputValid, setCidadeInputValid] = useState(true);
  const [dataValid, setDataValid] = useState(true);
  const [turnoValid, setTurnoValid] = useState(true);
  const [temperaturaMaxValid, setTemperaturaMaxValid] = useState(true);
  const [temperaturaMinValid, setTemperaturaMinValid] = useState(true);
  const [precipitacaoValid, setPrecipitacaoValid] = useState(true);
  const [umidadeValid, setUmidadeValid] = useState(true);
  const [ventoValid, setVentoValid] = useState(true);
  const [climaValid, setClimaValid] = useState(true);

  const handleSubmit = async (event) => {
    event.preventDefault();

    let valid = true;

    const cidadeRegex = /^[^\s].*[^\s]$/;
    if (!cidadeRegex.test(cidadeInput.trim())) {
      setCidadeInputValid(false);
    } else {
      setCidadeInputValid(true);
    }

    if (!data) {
      setDataValid(false);
      valid = false;
    } else {
      setDataValid(true);
    }

    if (!turno) {
      setTurnoValid(false);
      valid = false;
    } else {
      setTurnoValid(true);
    }

    if (!temperaturaMax) {
      setTemperaturaMaxValid(false);
      valid = false;
    } else {
      setTemperaturaMaxValid(true);
    }

    if (!temperaturaMin) {
      setTemperaturaMinValid(false);
      valid = false;
    } else {
      setTemperaturaMinValid(true);
    }

    if (!precipitacao) {
      setPrecipitacaoValid(false);
      valid = false;
    } else {
      setPrecipitacaoValid(true);
    }

    if (!umidade) {
      setUmidadeValid(false);
      valid = false;
    } else {
      setUmidadeValid(true);
    }

    if (!vento) {
      setVentoValid(false);
      valid = false;
    } else {
      setVentoValid(true);
    }

    if (!clima || clima === "Selecione a opção") {
      setClimaValid(false);
      valid = false;
    } else {
      setClimaValid(true);
    }

    if (!valid) {
      showToast({
        type: "warn",
        message: "Por favor, preencha todos os campos.",
      });
      return;
    }

    const formData = {
      nomeCidade: cidadeInput,
      dataCadastro: data.format(dateFormatList),
      cidadeTurno: turno,
      cidadeTempo: clima,
      temperaturaMaxima: temperaturaMax,
      temperaturaMinima: temperaturaMin,
      precipitacao,
      umidade,
      velocidadeDoVento: vento,
    };

    try {
      await axios.post(`${API_URL}/previsao`, formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      showToast({
        type: "success",
        message: "Dados enviados com sucesso!",
      });
    } catch (error) {
      showToast({
        type: "error",
        message: "Erro ao enviar dados.",
      });
      console.error("Erro ao enviar dados:", error);
    }
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <h1>Cadastro de dados Meteorológicos</h1>
        <div className="col-1">
          <label>Buscar a cidade</label>
          <p>Cidade*</p>
          <input
            type="text"
            className={`cidadeinput ${!cidadeInputValid ? "invalid" : ""}`}
            placeholder="Busque por uma cidade"
            value={cidadeInput}
            onChange={(e) => setCidadeInput(e.target.value)}
          />
          {!cidadeInputValid && (
            <p className="error-message">Informe a cidade.</p>
          )}
          <label className="temperaturalabel">Informe a Temperatura</label>
          <div className="updown-container">
            <div
              className={`updown-div ${!temperaturaMaxValid ? "invalid" : ""}`}
            >
              <p>Máxima*</p>
              <UpDownButton
                unit="°C"
                value={temperaturaMax}
                setValue={setTemperaturaMax}
              />
            </div>
            <div
              className={`updown-div ${!temperaturaMinValid ? "invalid" : ""}`}
            >
              <p>Mínima*</p>
              <UpDownButton
                unit="°C"
                value={temperaturaMin}
                setValue={setTemperaturaMin}
              />
            </div>
          </div>
          {!temperaturaMaxValid && (
            <p className="error-message">Informe a temperatura máxima.</p>
          )}
          {!temperaturaMinValid && (
            <p className="error-message">Informe a temperatura mínima.</p>
          )}
        </div>
        <div className="col-2">
          <label>Selecione a data</label>
          <p>Data*</p>
          <DatePicker
            className={`datainput ${!dataValid ? "invalid" : ""}`}
            value={data}
            defaultValue={null}
            format={dateFormatList}
            onChange={(date) => setData(date)}
            placeholder="Selecione a data"
          />
          {!dataValid && <p className="error-message">Informe a data.</p>}
          <label>Selecione o Turno</label>
          <p>Turno*</p>
          <Turno setTurno={setTurno} />
          {!turnoValid && <p className="error-message">Selecione um turno.</p>}
        </div>
        <div className="col-3">
          <div className="climacontainer">
            <div>
              <label>Informe o Clima</label>
              <p>Clima*</p>
              <select
                className={`climaselect ${!climaValid ? "invalid" : ""}`}
                value={clima}
                onChange={(e) => setClima(e.target.value)}
              >
                <option>Selecione a opção</option>
                <option>LIMPO</option>
                <option>PARCIALMENTE NUBLADO</option>
                <option>NUBLADO</option>
                <option>ENSOLARADO</option>
                <option>CHUVOSO</option>
                <option>TEMPESTUOSO</option>
                <option>NEVADO</option>
                <option>VENTOSO</option>
              </select>
              {!climaValid && <p className="error-message">Informe o clima.</p>}
            </div>

            <div className="updown-container">
              <div
                className={`updown-div ${!precipitacaoValid ? "invalid" : ""}`}
              >
                <p>Precipitação*</p>
                <UpDownButton
                  unit="mm"
                  value={precipitacao}
                  setValue={setPrecipitacao}
                />
                {!precipitacaoValid && (
                  <p className="error-message">Informe a precipitação.</p>
                )}
              </div>
              <div className={`updown-div ${!umidadeValid ? "invalid" : ""}`}>
                <p>Umidade*</p>
                <UpDownButton unit="%" value={umidade} setValue={setUmidade} />
                {!umidadeValid && (
                  <p className="error-message">Informe a umidade.</p>
                )}
              </div>
              <div className={`updown-div ${!ventoValid ? "invalid" : ""}`}>
                <p>Velocidade do vento*</p>
                <UpDownButton unit="Km/h" value={vento} setValue={setVento} />
                {!ventoValid && (
                  <p className="error-message">
                    Informe a velocidade do vento.
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="buttonscontainer">
          <button type="button" className="cancelarbutton">
            Cancelar
          </button>
          <button type="submit" className="salvarbutton">
            Salvar
          </button>
        </div>
      </form>
    </div>
  );
};

export default Form;
