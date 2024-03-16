import React, { createContext, useState } from "react";
import { TOOLS } from "@constants";

const CanvasContext = createContext();

// eslint-disable-next-line react/prop-types
const CanvasProvider = ({ children }) => {
  const [tool, setTool] = useState(TOOLS.IMPORT);

  const context = {
    tool, setTool,
  };

  return (
    <CanvasContext.Provider value={context}>{children}</CanvasContext.Provider>
  );
};

export { CanvasProvider, CanvasContext };