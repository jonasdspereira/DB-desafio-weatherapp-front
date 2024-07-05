import React, { useState, useEffect } from "react";
import "./style.css";

interface TurnoInputProps {
  setTurno: (value: string | null) => void;
  isValid: boolean;
  initialTurno: string | null;
}

const TurnoInput: React.FC<TurnoInputProps> = ({ setTurno, isValid, initialTurno }) => {
  const [selectedTurno, setSelectedTurno] = useState<string | null>(initialTurno);

  useEffect(() => {
    setSelectedTurno(initialTurno);
  }, [initialTurno]);

  const handleTurnoClick = (turno: string) => {
    setSelectedTurno(turno);
    setTurno(turno);
  };

  return (
    <>
      <label style={{ marginTop: 64 }}>Selecione o Turno</label>
      <p>Turno*</p>
      <div>
        <button
          type="button"
          className={`turnobutton ${selectedTurno === "MANHA" ? "selected" : ""} ${
            isValid ? "" : "invalid"
          }`}
          onClick={() => handleTurnoClick("MANHA")}
        >
          Manhã
        </button>
        <button
          type="button"
          className={`turnobutton ${selectedTurno === "TARDE" ? "selected" : ""} ${
            isValid ? "" : "invalid"
          }`}
          onClick={() => handleTurnoClick("TARDE")}
        >
          Tarde
        </button>
        <button
          type="button"
          className={`turnobutton ${selectedTurno === "NOITE" ? "selected" : ""} ${
            isValid ? "" : "invalid"
          }`}
          onClick={() => handleTurnoClick("NOITE")}
        >
          Noite
        </button>
      </div>
      {!isValid && <p className="error-message">Selecione um turno.</p>}
    </>
  );
};

export default TurnoInput;
