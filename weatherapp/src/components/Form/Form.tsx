import React, { useState, useEffect } from "react";
import "react-toastify/dist/ReactToastify.css";
import { showToast } from "./Toast";
import axios from "axios";
import "./style.css";
import moment, { Moment } from "moment";
import { useParams, useNavigate } from "react-router-dom";
import CidadeInput from "./CidadeInput";
import TemperaturaInput from "./TemperaturaInput";
import DataInput from "./DataInput";
import Turno from "../Turno/Turno";
import ClimaInput from "./ClimaInput";
import PrecipitacaoInput from "./PrecipitacaoInput";
import UmidadeInput from "./UmidadeInput";
import VentoInput from "./VentoInput";

interface ValidState {
  cidade: boolean;
  data: boolean;
  turno: boolean;
  temperaturaMax: boolean;
  temperaturaMin: boolean;
  precipitacao: boolean;
  umidade: boolean;
  vento: boolean;
  clima: boolean;
}

const Form: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const API_URL = process.env.REACT_APP_API_URL;
  const dateFormatList = "DD/MM/YYYY";

  const [cidade, setCidade] = useState<string>("");
  const [data, setData] = useState<Moment | null>(null);
  const [temperaturaMax, setTemperaturaMax] = useState<number>(0);
  const [temperaturaMin, setTemperaturaMin] = useState<number>(0);
  const [precipitacao, setPrecipitacao] = useState<number>(0);
  const [umidade, setUmidade] = useState<number>(0);
  const [vento, setVento] = useState<number>(0);
  const [clima, setClima] = useState<string | null>(null);
  const [turno, setTurno] = useState<string | null>(null);
  const navigateTo = useNavigate();

  const initialValidState: ValidState = {
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

  const [inputValid, setInputValid] = useState<ValidState>(initialValidState);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const previsaoRegex = /^[^\s].*[^\s]$/;

    const newValidState: ValidState = {
      cidade: cidade ? previsaoRegex.test(cidade.trim()) : false,
      data: !!data,
      turno: !!turno,
      temperaturaMax: !!temperaturaMax,
      temperaturaMin: !!temperaturaMin,
      precipitacao: !!precipitacao,
      umidade: !!umidade,
      vento: !!vento,
      clima: clima !== null,
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
      dataCadastro: data?.format(dateFormatList) ?? "",
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
          `${API_URL}/previsoes/previsao/${id}`,
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
    <div>
        <h1>
          {id
            ? "Editar Dados Meteorológicos"
            : "Cadastro de Dados Meteorológicos"}
        </h1>
      <form onSubmit={handleSubmit}>
        
        <div className="col-1">
          <CidadeInput cidade={cidade} setCidade={setCidade} isValid={inputValid.cidade} />
          <TemperaturaInput
            temperaturaMax={temperaturaMax}
            setTemperaturaMax={setTemperaturaMax}
            temperaturaMin={temperaturaMin}
            setTemperaturaMin={setTemperaturaMin}
            isValidMax={inputValid.temperaturaMax}
            isValidMin={inputValid.temperaturaMin}
          />
        </div>
        <div className="col-2">
          <DataInput data={data} setData={setData} isValid={inputValid.data} />
          <Turno setTurno={setTurno} isValid={inputValid.turno} initialTurno={turno} />
        </div>
        <div className="col-3">
          <ClimaInput clima={clima} setClima={setClima} isValid={inputValid.clima} />
          <PrecipitacaoInput precipitacao={precipitacao} setPrecipitacao={setPrecipitacao} isValid={inputValid.precipitacao} />
          <UmidadeInput umidade={umidade} setUmidade={setUmidade} isValid={inputValid.umidade} />
          <VentoInput vento={vento} setVento={setVento} isValid={inputValid.vento} />
        </div>
        <div className="buttonscontainer">
          <button type="submit" className="salvarbutton">
            Salvar
          </button>
          <button type="button" className="cancelarbutton" onClick={handleCancel}>
            Cancelar
          </button>
        </div>
      </form>
    </div>
    
  );
};

export default Form;
