import React from "react";
import "./style.css";
import up from "./up.png";
import down from "./down.png";

const UpDownButton = ({ unit, value, setValue, isValid, testId }) => {
  const handleIncrement = () => {
    const newValue = value + 1;
    setValue(newValue);
  };

  const handleDecrement = () => {
    const newValue = value - 1;
    setValue(newValue);
  };

  const handleChange = (event) => {
    const newValue = parseInt(event.target.value);
    if (!isNaN(newValue)) {
      setValue(newValue);
    }
  };

  return (
    <div
      className={`updown ${isValid ? "" : "invalid-border"}`}
      data-testid={testId}
    >
      <img src={down} alt="down" onClick={handleDecrement} />
      <input
        className="updown-input"
        type="number"
        value={value}
        onChange={handleChange}
        data-testid={`${testId}-input`}
      />
      <span className="unit">{unit}</span>
      <img src={up} alt="up" onClick={handleIncrement} />
    </div>
  );
};

export default UpDownButton;
