import React from "react";
import { DatePicker } from "antd";
import { Moment } from "moment";

interface DataInputProps {
  data: Moment | null;
  setData: (date: Moment | null) => void;
  isValid: boolean;
}

const DataInput: React.FC<DataInputProps> = ({ data, setData, isValid }) => (
  <>
    <label>Selecione a data</label>
    <p>Data*</p>
    <DatePicker
      className={`datainput ${!isValid ? "invalid" : ""}`}
      value={data}
      defaultValue={null}
      format="DD/MM/YYYY"
      onChange={(date) => setData(date)}
      placeholder="Selecione a data"
    />
    {!isValid && <p className="error-message">Informe a data.</p>}
  </>
);

export default DataInput;
