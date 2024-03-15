import React from "react";
import { Canvas } from "@components";
import { CanvasProvider } from "@contexts";

const Home = () => {
  return (
    <CanvasProvider>
      <Canvas />
    </CanvasProvider>
  );
}

export default Home;