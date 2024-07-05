import React from "react";
import UpDownButton from "../UpDownButton/UpDownButton";

interface VentoInputProps {
  vento: number;
  setVento: (value: number) => void;
  isValid: boolean;
}

const VentoInput: React.FC<VentoInputProps> = ({ vento, setVento, isValid }) => (
  <div>
    <label>Informe a Velocidade do Vento</label>
    <p>Vento*</p>
    <UpDownButton
      testId="vento"
      unit="km/h"
      value={vento}
      setValue={setVento}
      isValid={isValid}
    />
    {!isValid && <p className="error-message">Informe a velocidade do vento.</p>}
  </div>
);

export default VentoInput;
