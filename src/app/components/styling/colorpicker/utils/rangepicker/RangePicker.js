import React from "react";

const RangePicker = ({ label, value, min, max, step, onChange }) => {
  const handleValueChange = (event) => {
    onChange(event.target.value);
  };

  return (
    <div className="range-selector">
      <label htmlFor="rangeInput">{label}: {value}</label>
      <input
        type="range"
        id="rangeInput"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={handleValueChange}
      />
    </div>
  );
};

export default RangePicker;
