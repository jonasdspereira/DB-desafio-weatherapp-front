import React from "react";
import { Input } from "antd";

interface CidadeInputProps {
  cidade: string;
  setCidade: (value: string) => void;
  isValid: boolean;
}

const CidadeInput: React.FC<CidadeInputProps> = ({ cidade, setCidade, isValid }) => (
  <div className="cidadecontainer">
    <label>Buscar a cidade</label>
    <p>Cidade*</p>
      <Input
        className={`cidadeinput ${!isValid ? "invalid" : ""}`}
        placeholder="Busque por uma cidade"
        value={cidade}
        onChange={(e) => setCidade(e.target.value)}
      />
    {!isValid && <p className="error-message">Informe a cidade.</p>}
  </div>
);

export default CidadeInput;
