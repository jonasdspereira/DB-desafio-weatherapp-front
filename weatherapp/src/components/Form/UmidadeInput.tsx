import React from "react";
import UpDownButton from "../UpDownButton/UpDownButton";

interface UmidadeInputProps {
  umidade: number;
  setUmidade: (value: number) => void;
  isValid: boolean;
}

const UmidadeInput: React.FC<UmidadeInputProps> = ({ umidade, setUmidade, isValid }) => (
  <div>
    <label>Informe a Umidade</label>
    <p>Umidade*</p>
    <UpDownButton
      testId="umidade"
      unit="%"
      value={umidade}
      setValue={setUmidade}
      isValid={isValid}
    />
    {!isValid && <p className="error-message">Informe a umidade.</p>}
  </div>
);

export default UmidadeInput;
