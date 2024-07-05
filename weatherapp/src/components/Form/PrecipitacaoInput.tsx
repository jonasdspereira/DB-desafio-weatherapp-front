import React from "react";
import UpDownButton from "../UpDownButton/UpDownButton";

interface PrecipitacaoInputProps {
  precipitacao: number;
  setPrecipitacao: (value: number) => void;
  isValid: boolean;
}

const PrecipitacaoInput: React.FC<PrecipitacaoInputProps> = ({ precipitacao, setPrecipitacao, isValid }) => (
  <div>
    <label>Informe a Precipitação</label>
    <p>Precipitação*</p>
    <UpDownButton
      testId="precipitacao"
      unit="mm"
      value={precipitacao}
      setValue={setPrecipitacao}
      isValid={isValid}
    />
    {!isValid && <p className="error-message">Informe a precipitação.</p>}
  </div>
);

export default PrecipitacaoInput;
