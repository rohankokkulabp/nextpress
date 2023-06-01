"use client";
import React, { useState } from "react";
import SidePanel from "./components/maincontainer/oldSidePanel";
import Sidebar from "./components/maincontainer/MainContainer";
import MainContainer from "./components/maincontainer/MainContainer";
export default function Home() {
  const [color, setColor] = useState("#8d71bc");
  return (
    <div>
      {/* <SidePanel color={color} onChange={setColor} /> */}
      <MainContainer/>
    </div>
  );
}
