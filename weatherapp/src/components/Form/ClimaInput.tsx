import React from "react";
import { Select } from "antd";
import "./style.css";
const { Option } = Select;

interface ClimaInputProps {
  clima: string | null;
  setClima: (value: string | null) => void;
  isValid: boolean;
}

const ClimaInput: React.FC<ClimaInputProps> = ({ clima, setClima, isValid }) => (
  <div>
    <label style={{ marginTop: 64 }}>Informe o Clima</label>
    <p>Clima*</p>
    <Select
      className={`climainput ${!isValid ? "invalid" : ""}`}
      placeholder="Selecione o clima"
      value={clima}
      onChange={(value) => setClima(value)}
    >
      <Option value="Ensolarado">Ensolarado</Option>
      <Option value="Limpo">Limpo</Option>
      <Option value="Parcialmente Nublado">Parcialmente Nublado</Option>
      <Option value="Ventoso">Ventoso</Option>
      <Option value="Nublado">Nublado</Option>
      <Option value="Chuvoso">Chuvoso</Option>
      <Option value="Tempestuoso">Tempestuoso</Option>
      <Option value="Nevado">Nevado</Option>
    </Select>
    {!isValid && <p className="error-message">Informe a previsão do tempo.</p>}
  </div>
);

export default ClimaInput;
