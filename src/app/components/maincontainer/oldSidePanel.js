import React, { useState } from "react";
import ColorPicker from "../styling/colorpicker/utils/colorpicker/ColorPicker";
import RangePicker from "../styling/colorpicker/utils/rangepicker/RangePicker";
import UploadCSS from "../upload-to-s3/UploadCSS";
import generateCssContent from "../styling/generateCssContent";

const oldSidePanel = () => {
  const [color, setColor] = useState("#324d92"); // Initial color of the rectangle
  const [botId, setBotId] = useState("b419b124-7f17-41b4-ae05-526707a1b480");
  const [botRadius, setBotRadius] = useState(7);
  const [right, setRight] = useState(30); // Initial value for right property
  const [bottom, setBottom] = useState(50); // Initial value for bottom property
  const [height, setHeight] = useState(50); // Initial value for bottom property
  const [width, setWidth] = useState(360); //px
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

  const handleRightChange = (newRight) => {
    setRight(newRight);
    setFilename(generateUniqueNumber());
  };

  const handleBottomChange = (newBottom) => {
    setBottom(newBottom);
    setFilename(generateUniqueNumber());
  };

  const handleHeightChange = (newHeight) => {
    setHeight(newHeight);
    setFilename(generateUniqueNumber());
  };

  const handleWidthChange = (newWidth) => {
    setWidth(newWidth);
    setFilename(generateUniqueNumber());
  };

  return (
    <div className="side-panel">
      <input
        type="text"
        className="text-2xl"
        value={botId}
        onChange={handleBotIdChange}
        placeholder="Enter Bot ID"
        style={{ width: "500px" }}
      />
      <RangePicker
        label="Bot Radius"
        value={botRadius}
        min="0"
        max="50"
        step="1"
        onChange={handleBotRadiusChange}
      />
      <RangePicker
        label="Right"
        value={right}
        min="0"
        max="100"
        step="1"
        onChange={handleRightChange}
      />
      <RangePicker
        label="Bottom"
        value={bottom}
        min="0"
        max="100"
        step="1"
        onChange={handleBottomChange}
      />
      <RangePicker
        label="Height"
        value={height}
        min="0"
        max="100"
        step="1"
        onChange={handleHeightChange}
      />
      <RangePicker
        label="Width"
        value={width}
        min="330"
        max="430"
        step="1"
        onChange={handleWidthChange}
      />
      <ColorPicker color={color} onChange={handleColorChange} />
      {botId && (
        <div className="generator">
          <UploadCSS
            botId={botId}
            cssContent={generateCssContent(
              color,
              botRadius,
              bottom,
              right,
              height,
              width
            )}
            filename={filename}
          />
        </div>
      )}
    </div>
  );
};

export default oldSidePanel;
