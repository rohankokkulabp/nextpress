"use client";
import React, { useState } from "react";
import SidePanel from "./components/styling/colorpicker/SidePanel";
export default function Home() {
  const [color, setColor] = useState("#8d71bc");
  return (
    <div>
      <SidePanel color={color} onChange={setColor} />
    </div>
  );
}
