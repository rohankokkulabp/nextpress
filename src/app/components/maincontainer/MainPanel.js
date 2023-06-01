import React, { useState } from "react";
import { WelcomeCard } from "./welcomecard/WelcomeCard";
export const MainPanel = ({
  activeItem,
  handleColorChange,
  handleBotRadiusChange,
  handleBottomChange,
  handleRightChange,
  handleHeightChange,
  handleWidthChange,
  color,
  botRadius,
  bottom,
  right,
  height,
  width,
}) => {
  return (
    <div className="flex-1 bg-gray-100 p-8">
      {activeItem ? (
        <div className="mb-8">
          <h1 className="text-2xl font-bold mb-4">{activeItem.title}</h1>
          <p className="text-gray-400 text-sm mt-1">{activeItem.description}</p>
          {activeItem.component}
        </div>
      ) : (
        <WelcomeCard />
      )}
    </div>
  );
};
