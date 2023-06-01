import React, { useCallback, useRef, useState } from "react";
import { HexColorPicker, HexColorInput } from "react-colorful";
import useClickOutside from "./useClickOutside";

const ColorPicker = ({ color, onChange }) => {
  const popover = useRef();
  const [isOpen, setIsOpen] = useState(false);
  const [debouncedColor, setDebouncedColor] = useState(color);

  const close = useCallback(() => {
    setIsOpen(false);
    //console.log("Color picker closed");
  }, []);

  const open = useCallback(() => {
    setIsOpen(true);
    //console.log("Color picker opened");
  }, []);

  useClickOutside(popover, close);

  const debouncedOnChange = useCallback(
    debounce((newColor) => {
      onChange(newColor); // Notify parent component about the color change
    }, 300),
    [onChange]
  );

  const handleColorChange = (newColor) => {
    setDebouncedColor(newColor);
    debouncedOnChange(newColor);
  };

  return (
    <>
      <div className="picker">
        <div className="pickers">
          <div className="theme-selector">
            <div
              className="swatch"
              style={{ backgroundColor: debouncedColor }}
              onClick={open}
            />
            <HexColorInput
              color={debouncedColor}
              onChange={handleColorChange}
              className="color-input"
            />
            {isOpen && (
              <div className="popover" ref={popover}>
                <HexColorPicker
                  color={debouncedColor}
                  onChange={handleColorChange}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

// Debounce utility function
const debounce = (fn, delay) => {
  let timeoutId;
  return function (...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      fn.apply(this, args);
    }, delay);
  };
};

export default ColorPicker;
