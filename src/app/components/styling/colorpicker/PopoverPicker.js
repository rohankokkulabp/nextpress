import React, { useState } from "react";
import UploadCSS from "../../UploadCSS";
import ColorPicker from "./ColorPicker";
import RangePicker from "./RangePicker";
import generateCssContent from "../generateCssContent";

export const PopoverPicker = () => {
  const [color, setColor] = useState("#324d92"); // Initial color of the rectangle
  const [botId, setBotId] = useState("b419b124-7f17-41b4-ae05-526707a1b480");
  const [botRadius, setBotRadius] = useState(7);

  const generateUniqueNumber = () => {
    return Math.floor(Math.random() * 1000000); // Generate a random number
  };
  const [filename, setFilename] = useState(() => generateUniqueNumber()); // Generate a unique number on initial render

  const handleColorChange = (newColor) => {
    setColor(newColor);
    setFilename(generateUniqueNumber()); // Generate a new unique number when color changes
  };

  const handleBotIdChange = (event) => {
    setBotId(event.target.value);
  };

  const handleBotRadiusChange = (newBotRadius) => {
    setBotRadius(newBotRadius);
    setFilename(generateUniqueNumber());
  };

  const lightThemeCssContent = generateCssContent(color, botRadius);
  const darkThemeCssContent = generateCssContent(color, botRadius);

  return (
    <>
      <div className="picker">
        <div className="pickers">
          <input
            type="text"
            value={botId}
            onChange={handleBotIdChange}
            placeholder="Enter Bot ID"
            style={{ width: "500px" }}
          />
          <div className="theme-selector">
            <ColorPicker color={color} onChange={handleColorChange} />
          </div>
          <RangePicker
            label="Bot Radius"
            value={botRadius}
            min="0"
            max="50"
            step="1"
            onChange={handleBotRadiusChange}
          />
          {botId && (
            <div className="generator">
              <UploadCSS
                botId={botId}
                color={color}
                botRadius={botRadius}
                filename={filename}
              />
              <style>
                {`.theme-light {${lightThemeCssContent}} .theme-dark {${darkThemeCssContent}}`}
              </style>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
