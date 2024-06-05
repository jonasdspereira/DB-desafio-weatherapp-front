import React from "react";
import "./style.css";
import up from "./img/up.png";
import down from "./img/down.png";

const UpDownButton = ({ unit, value, setValue, isValid }) => {
  const handleIncrement = () => {
    const newValue = value + 1;
    setValue(newValue);
  };

  const handleDecrement = () => {
    const newValue = value - 1;
    setValue(newValue);
  };

  const handleChange = (event) => {
    const newValue = parseInt(event.target.value) || 0;
    setValue(newValue);
  };

  return (
    <div className={`updown ${isValid ? "" : "invalid-border"}`}>
      <img src={down} alt="" onClick={handleDecrement} />
      <input
        className="updown-input"
        type="text"
        value={value}
        onChange={handleChange}
      />
      <span className="unit">{unit}</span>
      <img src={up} alt="" onClick={handleIncrement} />
    </div>
  );
};

export default UpDownButton;
