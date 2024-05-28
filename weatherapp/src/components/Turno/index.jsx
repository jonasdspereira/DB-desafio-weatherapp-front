import React, { useState } from "react";
import "./style.css";

const Turno = ({ setTurno, invalid }) => {
  const [selectedTurno, setSelectedTurno] = useState(null);

  const handleTurnoClick = (turno) => {
    setSelectedTurno(turno);
    setTurno(turno);
  };

  return (
    <div>
      <button
        type="button"
        className={`turnobutton ${
          selectedTurno === "MANHA" ? "selected" : ""
        } ${invalid ? "invalid" : ""}`}
        onClick={() => handleTurnoClick("MANHA")}
      >
        MANHA
      </button>
      <button
        type="button"
        className={`turnobutton ${
          selectedTurno === "TARDE" ? "selected" : ""
        } ${invalid ? "invalid" : ""}`}
        onClick={() => handleTurnoClick("TARDE")}
      >
        TARDE
      </button>
      <button
        type="button"
        className={`turnobutton ${
          selectedTurno === "NOITE" ? "selected" : ""
        } ${invalid ? "invalid" : ""}`}
        onClick={() => handleTurnoClick("NOITE")}
      >
        NOITE
      </button>
    </div>
  );
};

export default Turno;
