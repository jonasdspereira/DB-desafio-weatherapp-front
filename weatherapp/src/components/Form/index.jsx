import React, { useState, useEffect } from "react";
import "react-toastify/dist/ReactToastify.css";
import { showToast } from "./Toast";
import axios from "axios";
import "./style.css";
import UpDownButton from "../UpDownButton";
import { DatePicker, Input, Select, ConfigProvider } from "antd";
import moment from "moment";
import Turno from "../Turno";
import { useParams, useNavigate } from "react-router-dom";

const Form = () => {
  const { id } = useParams();
  const API_URL = process.env.REACT_APP_API_URL;
  const dateFormatList = "DD/MM/YYYY";

  const [cidade, setCidade] = useState("");
  const [data, setData] = useState(null);
  const [temperaturaMax, setTemperaturaMax] = useState(0);
  const [temperaturaMin, setTemperaturaMin] = useState(0);
  const [precipitacao, setPrecipitacao] = useState(0);
  const [umidade, setUmidade] = useState(0);
  const [vento, setVento] = useState(0);
  const [clima, setClima] = useState(null);
  const [turno, setTurno] = useState(null);
  const navigateTo = useNavigate();

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

    const previsaoRegex = /^[^\s].*[^\s]$/;

    const newValidState = {
      cidade: cidade ? previsaoRegex.test(cidade.trim()) : false,
      data: !!data,
      turno: !!turno,
      temperaturaMax: !!temperaturaMax,
      temperaturaMin: !!temperaturaMin,
      precipitacao: !!precipitacao,
      umidade: !!umidade,
      vento: !!vento,
      clima: clima && clima !== null,
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
      nomeCidade: cidade,
      dataCadastro: data.format(dateFormatList),
      previsaoTurno: turno,
      previsaoTempo: clima,
      temperaturaMaxima: temperaturaMax,
      temperaturaMinima: temperaturaMin,
      precipitacao,
      umidade,
      velocidadeDoVento: vento,
    };

    console.log("Enviando dados:", formData);

    try {
      let response;
      if (id) {
        response = await axios.put(
          `${API_URL}/previsoes/${cidade}/${id}`,
          formData,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        showToast({
          type: "success",
          message: "Dados atualizados com sucesso!",
        });
      } else {
        response = await axios.post(`${API_URL}/previsoes`, formData, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        showToast({
          type: "success",
          message: "Dados enviados com sucesso!",
        });
      }

      console.log("Resposta do servidor:", response);
    } catch (error) {
      showToast({
        type: "error",
        message: "Erro ao enviar dados.",
      });
      console.error("Erro ao enviar dados:", error);
    }
  };

  useEffect(() => {
    if (id) {
      axios
        .get(`${API_URL}/previsoes/previsao/${id}`)
        .then((response) => {
          const data = response.data;
          setCidade(data.nomeCidade || "");
          setData(
            data.dataCadastro ? moment(data.dataCadastro, dateFormatList) : null
          );
          setTurno(data.previsaoTurno || null);
          setTemperaturaMax(data.temperaturaMaxima || 0);
          setTemperaturaMin(data.temperaturaMinima || 0);
          setPrecipitacao(data.precipitacao || 0);
          setUmidade(data.umidade || 0);
          setVento(data.velocidadeDoVento || 0);
          setClima(data.previsaoTempo || null);
        })
        .catch((error) => {
          console.error("Erro ao buscar dados:", error);
          showToast({
            type: "error",
            message: "Erro ao carregar os dados para edição.",
          });
        });
    }
  }, [id, API_URL]);

  const handleCancel = () => {
    navigateTo("/");
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <h1>
          {id
            ? "Editar Dados Meteorológicos"
            : "Cadastro de Dados Meteorológicos"}
        </h1>
        <div className="col-1">
          <div className="cidadecontainer">
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
                value={cidade}
                onChange={(e) => setCidade(e.target.value)}
              />
            </ConfigProvider>

            {!inputValid.cidade && (
              <p className="error-message">Informe a cidade.</p>
            )}
            <label className="temperaturalabel">Informe a Temperatura</label>
            <div className="updown-main">
              <div className="updown-div">
                <p>Máxima*</p>
                <UpDownButton
                  testId="maxima"
                  unit="°C"
                  value={temperaturaMax}
                  setValue={setTemperaturaMax}
                  isValid={inputValid.temperaturaMax}
                />
              </div>
              <div className="updown-div">
                <p>Mínima*</p>
                <UpDownButton
                  testId="minima"
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
        </div>
        <div className="col-2">
          <label>Selecione a data</label>
          <p>Data*</p>
          <DatePicker
            className={`datainput ${!inputValid.data ? "invalid" : ""}`}
            value={data}
            defaultValue={null}
            format={dateFormatList}
            onChange={(date) => setData(date)}
            placeholder="Selecione a data"
          />
          {!inputValid.data && <p className="error-message">Informe a data.</p>}
          <label style={{ marginTop: 64 }}>Selecione o Turno</label>
          <p>Turno*</p>
          <Turno setTurno={setTurno} invalid={!inputValid.turno} />
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
                      activeBorderColor: "var(--primary-color-azul-medio)",
                      colorBorder: "var(--primary-color-azul-medio)",
                    },
                  },
                }}
              >
                <Select
                  data-testid="custom-select"
                  placeholder="Selecione a opção"
                  style={{ width: 205, height: 56 }}
                  className={`custom-select ${
                    !inputValid.clima ? "invalid" : ""
                  }`}
                  value={clima}
                  onChange={(value) => setClima(value)}
                  showSearch={false}
                >
                  <Option value="LIMPO">LIMPO</Option>
                  <Option value="PARCIALMENTE NUBLADO">
                    PARCIALMENTE NUBLADO
                  </Option>
                  <Option value="NUBLADO">NUBLADO</Option>
                  <Option value="ENSOLARADO">ENSOLARADO</Option>
                  <Option value="CHUVOSO">CHUVOSO</Option>
                  <Option value="TEMPESTUOSO">TEMPESTUOSO</Option>
                  <Option value="NEVADO">NEVADO</Option>
                  <Option value="VENTOSO">VENTOSO</Option>
                </Select>
              </ConfigProvider>

              {!inputValid.clima && (
                <p className="error-message">Informe o clima.</p>
              )}
            </div>

            <div className="updown-main">
              <div className="updown-div">
                <p>Precipitação*</p>
                <UpDownButton
                  testId="precipitacao"
                  unit="mm"
                  value={precipitacao}
                  setValue={setPrecipitacao}
                  isValid={inputValid.precipitacao}
                />
                {!inputValid.precipitacao && (
                  <p className="error-message">Informe a precipitação.</p>
                )}
              </div>
              <div className="updown-div">
                <p>Umidade*</p>
                <UpDownButton
                  testId="umidade"
                  unit="%"
                  value={umidade}
                  setValue={setUmidade}
                  isValid={inputValid.umidade}
                />
                {!inputValid.umidade && (
                  <p className="error-message">Informe a umidade.</p>
                )}
              </div>
              <div className="updown-div">
                <p>Velocidade do vento*</p>
                <UpDownButton
                  testId="vento"
                  unit="Km/h"
                  value={vento}
                  setValue={setVento}
                  isValid={inputValid.vento}
                />
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
          <button
            type="button"
            className="cancelarbutton"
            onClick={handleCancel}
          >
            Cancelar
          </button>
          <button type="submit" className="salvarbutton">
            {id ? "Atualizar" : "Salvar"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Form;
