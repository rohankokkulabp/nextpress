"use client";
import React, { useState } from "react";
import { PopoverPicker } from "./components/PopoverPicker";
export default function Home() {
  const [color, setColor] = useState("#8d71bc");
  return (
    <div>
       <PopoverPicker
        color={color}
        onChange={setColor}
      />

    </div>
  );
};
