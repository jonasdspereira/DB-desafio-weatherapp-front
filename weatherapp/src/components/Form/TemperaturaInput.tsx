import React from "react";
import UpDownButton from "../UpDownButton/UpDownButton";

interface TemperaturaInputProps {
  temperaturaMax: number;
  setTemperaturaMax: (value: number) => void;
  temperaturaMin: number;
  setTemperaturaMin: (value: number) => void;
  isValidMax: boolean;
  isValidMin: boolean;
}

const TemperaturaInput: React.FC<TemperaturaInputProps> = ({
  temperaturaMax,
  setTemperaturaMax,
  temperaturaMin,
  setTemperaturaMin,
  isValidMax,
  isValidMin,
}) => (
  <>
    <label className="temperaturalabel">Informe a Temperatura</label>
    <div className="updown-main">
      <div className="updown-div">
        <p>Máxima*</p>
        <UpDownButton
          testId="maxima"
          unit="°C"
          value={temperaturaMax}
          setValue={setTemperaturaMax}
          isValid={isValidMax}
        />
      </div>
      <div className="updown-div">
        <p>Mínima*</p>
        <UpDownButton
          testId="minima"
          unit="°C"
          value={temperaturaMin}
          setValue={setTemperaturaMin}
          isValid={isValidMin}
        />
      </div>
    </div>
    {!isValidMax && <p className="error-message">Informe a temperatura máxima.</p>}
    {!isValidMin && <p className="error-message">Informe a temperatura mínima.</p>}
  </>
);

export default TemperaturaInput;
