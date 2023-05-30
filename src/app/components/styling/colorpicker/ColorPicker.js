import React, { useCallback, useRef, useState } from "react";
import { HexColorPicker, HexColorInput } from "react-colorful";
import useClickOutside from "./useClickOutside";

const ColorPicker = ({ color, onChange }) => {
  const popover = useRef();
  const [isOpen, toggle] = useState(false);

  const close = useCallback(() => {
    toggle(false);
    console.log("Color picker closed");
  }, []);

  const open = useCallback(() => {
    toggle(true);
    console.log("Color picker opened");
  }, []);

  useClickOutside(popover, close);

  const handleColorChange = (newColor) => {
    onChange(newColor); // Notify parent component about the color change
  };

  return (
    <>
      <div className="picker">
        <div className="pickers">
          <div className="theme-selector">
            <div
              className="swatch"
              style={{ backgroundColor: color }}
              onClick={open}
            />
            <HexColorInput
              color={color}
              onChange={handleColorChange}
              className="color-input"
            />
            {isOpen && (
              <div className="popover" ref={popover}>
                <HexColorPicker color={color} onChange={handleColorChange} />
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ColorPicker;
