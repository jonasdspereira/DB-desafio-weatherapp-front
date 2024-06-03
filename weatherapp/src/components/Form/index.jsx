import React, { useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import { showToast } from "./Toast";
import axios from "axios";
import "./style.css"; 
import "./customStyles.css";
import UpDownButton from "../UpDownButton";
import { DatePicker, Input, Select, ConfigProvider } from "antd";
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

  const initialValidState = {
    cidade: true,
    data: true,
    turno: true,
    temperaturaMax: true,
    temperaturaMin: true,
    precipitacao: true,
    umidade: true,
    vento: true,
    clima: true,
  };

  const [inputValid, setInputValid] = useState(initialValidState);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const cidadeRegex = /^[^\s].*[^\s]$/;

    const newValidState = {
      cidade: cidadeRegex.test(cidadeInput.trim()),
      data: !!data,
      turno: !!turno,
      temperaturaMax: !!temperaturaMax,
      temperaturaMin: !!temperaturaMin,
      precipitacao: !!precipitacao,
      umidade: !!umidade,
      vento: !!vento,
      clima: clima && clima !== "Selecione a opção",
    };

    setInputValid(newValidState);

    const valid = Object.values(newValidState).every(Boolean);

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
          <ConfigProvider
            theme={{
              components: {
                Input: {
                  algorithm: true,
                  hoverBorderColor: "var(--primary-color-azul-medio)",
                  activeBorderColor: "#fff", 
                },
              },
            }}
          >
            <Input
              className={`cidadeinput ${!inputValid.cidade ? "invalid" : ""}`}
              placeholder="Busque por uma cidade"
              value={cidadeInput}
              onChange={(e) => setCidadeInput(e.target.value)}
              style={{ width: 465, height: 55 }}
            ></Input>
          </ConfigProvider>

          {!inputValid.cidade && (
            <p className="error-message">Informe a cidade.</p>
          )}
          <label className="temperaturalabel" style={{ marginTop: 64 }}>
            Informe a Temperatura
          </label>
          <div className="updown-main">
            <div
              className="updown-div"
              style={{ marginRight: 40 }}
            >
              <p>Máxima*</p>
              <UpDownButton
                unit="°C"
                value={temperaturaMax}
                setValue={setTemperaturaMax}
                isValid={inputValid.temperaturaMax}
              />
            </div>
            <div
              className="updown-div"
            >
              <p>Mínima*</p>
              <UpDownButton
                unit="°C"
                value={temperaturaMin}
                setValue={setTemperaturaMin}
                isValid={inputValid.temperaturaMin}
              />
            </div>
          </div>
          {!inputValid.temperaturaMax && (
            <p className="error-message">Informe a temperatura máxima.</p>
          )}
          {!inputValid.temperaturaMin && (
            <p className="error-message">Informe a temperatura mínima.</p>
          )}
        </div>
        <div className="col-2">
          <label>Selecione a data</label>
          <p>Data*</p>
          <DatePicker
            className={`datainput ${!inputValid.data ? "invalid" : ""}`}
            value={data}
            defaultValue={null}
            style={{ width: 225, height: 55 }}
            format={dateFormatList}
            onChange={(date) => setData(date)}
            placeholder="Selecione a data"
          />
          {!inputValid.data && <p className="error-message">Informe a data.</p>}
          <label style={{ marginTop: 64 }}>Selecione o Turno</label>
          <p>Turno*</p>
          <Turno setTurno={setTurno} />
          {!inputValid.turno && (
            <p className="error-message">Selecione um turno.</p>
          )}
        </div>
        <div className="col-3">
          <div className="climacontainer">
            <div>
              <label style={{ marginTop: 64 }}>Informe o Clima</label>
              <p>Clima*</p>
              <ConfigProvider
                theme={{
                  components: {
                    Select: {
                      algorithm: true,
                      hoverBorderColor: "var(--primary-color-azul-medio)",
                      activeBorderColor: "#fff",
                    },
                  },
                }}
              >
                <Select
                  defaultValue="Selecione a opção"
                  style={{ width: 205, height: 56 }}
                  className={`custom-select ${
                    !inputValid.clima ? "invalid" : ""
                  } ${clima !== "Selecione a opção" ? "selected" : ""}`}
                  value={clima}
                  onChange={(value) => setClima(value)}
                  options={[
                    { value: "LIMPO", label: "LIMPO" },
                    {
                      value: "PARCIALMENTE NUBLADO",
                      label: "PARCIALMENTE NUBLADO",
                    },
                    { value: "NUBLADO", label: "NUBLADO" },
                    { value: "ENSOLARADO", label: "ENSOLARADO" },
                    { value: "CHUVOSO", label: "CHUVOSO" },
                    { value: "TEMPESTUOSO", label: "TEMPESTUOSO" },
                    { value: "NEVADO", label: "NEVADO" },
                    { value: "VENTOSO", label: "VENTOSO" },
                  ]}
                />
              </ConfigProvider>

              {!inputValid.clima && (
                <p className="error-message">Informe o clima.</p>
              )}
            </div>

            <div className="updown-main" style={{ marginLeft: 60 }}>
              <div
                className="updown-div"
                style={{ marginRight: 60 }}
              >
                <p>Precipitação*</p>
                <UpDownButton
                  unit="mm"
                  value={precipitacao}
                  setValue={setPrecipitacao}
                  isValid={inputValid.precipitacao}
                />
                {!inputValid.precipitacao && (
                  <p className="error-message">Informe a precipitação.</p>
                )}
              </div>
              <div
                className="updown-div"
                style={{ marginRight: 60 }}
              >
                <p>Umidade*</p>
                <UpDownButton unit="%" value={umidade} setValue={setUmidade} isValid={inputValid.umidade} />
                {!inputValid.umidade && (
                  <p className="error-message">Informe a umidade.</p>
                )}
              </div>
              <div
                className="updown-div"
              >
                <p>Velocidade do vento*</p>
                <UpDownButton unit="Km/h" value={vento} setValue={setVento} isValid={inputValid.vento} />
                {!inputValid.vento && (
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
