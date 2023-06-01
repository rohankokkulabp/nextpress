import React, { useState } from "react";
import { MainPanel } from "./MainPanel";
import { SidePanel } from "./sidenav/SidePanel";
import { TopNavbar } from "./topnav/TopNavbar";
import RangePicker from "../styling/colorpicker/utils/rangepicker/RangePicker";
import ColorPicker from "../styling/colorpicker/utils/colorpicker/ColorPicker";
import UploadCSS from "../upload-to-s3/UploadCSS";
import generateCssContent from "../styling/generateCssContent";

const MainContainer = () => {
  const [activeItem, setActiveItem] = useState(null);
  const [color, setColor] = useState("#324d92");
  const [botRadius, setBotRadius] = useState(7);
  const [right, setRight] = useState(30);
  const [bottom, setBottom] = useState(50);
  const [height, setHeight] = useState(50);
  const [width, setWidth] = useState(360);
  const [botId, setBotId] = useState("b419b124-7f17-41b4-ae05-526707a1b480");
  const generateUniqueNumber = () => {
    return Math.floor(Math.random() * 1000000);
  };
  const [filename, setFilename] = useState(() => generateUniqueNumber());

  const handleColorChange = (newColor) => {
    setColor(newColor);
    setFilename(generateUniqueNumber());
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

  const handleItemClick = (item) => {
    setActiveItem(item);
  };

  const handleBotIdChange = (event) => {
    setBotId(event.target.value);
    setFilename(generateUniqueNumber());
  };

  const handlePublish = () => {
    // Add your logic for the publish action here
  };

  const items = [
    {
      title: "Color Picker",
      description: "Select the color for the chatbot theme",
      id: "colorPicker",
      component: <ColorPicker color={color} onChange={handleColorChange} />,
    },
    {
      title: "Bot Radius",
      description: "Adjust the border radius of the chatbot",
      id: "botRadius",
      component: (
        <RangePicker
          label="Bot Radius"
          value={botRadius}
          min="0"
          max="50"
          step="1"
          onChange={handleBotRadiusChange}
        />
      ),
    },
    {
      title: "Margin Bottom",
      description: "Adjust the bottom margin of the chatbot",
      id: "marginBottom",
    },
    {
      title: "Margin Right",
      description: "Adjust the right margin of the chatbot",
      id: "marginRight",
    },
    {
      title: "Height",
      description: "Adjust the height of the chatbot",
      id: "height",
    },
    {
      title: "Width",
      description: "Adjust the width of the chatbot",
      id: "width",
    },
  ];

  return (
    <div className="bg-gray-100 text-gray-900 h-screen flex flex-col">
      <TopNavbar handlePublish={handlePublish} botId={botId} />
      <div className="flex flex-1">
        <SidePanel
          botId={botId}
          items={items}
          activeItem={activeItem}
          handleItemClick={handleItemClick}
          handleBotIdChange={handleBotIdChange}
          handlePublish={handlePublish}
        />
        <MainPanel
          activeItem={items.find((item) => item.id === activeItem)}
          handleColorChange={handleColorChange}
          handleBotRadiusChange={handleBotRadiusChange}
          handleBottomChange={handleBottomChange}
          handleRightChange={handleRightChange}
          handleHeightChange={handleHeightChange}
          handleWidthChange={handleWidthChange}
          color={color}
          botRadius={botRadius}
          bottom={bottom}
          right={right}
          height={height}
          width={width}
        />
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
    </div>
  );
};

export default MainContainer;
