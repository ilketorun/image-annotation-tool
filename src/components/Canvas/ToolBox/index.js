import React, { useContext } from "react";
import { Radio } from 'antd';
import { PropTypes } from "prop-types";

import { CanvasContext } from "@contexts";

import Export from "./Export";
import Import from "./Import";
import Pen from "./Pen";
import Brush from "./Brush";
import Undo from "./Undo";
import Redo from "./Redo";
import Eraser from "./Eraser";

import styles from './styles.module.css';

const ToolBox = ({ importZip }) => {
  const { tool, setTool } = useContext(CanvasContext);
  
  const onChange = e => {
    setTool(e.target.value);
  }

  return (
    <Radio.Group className={styles.container} onChange={onChange} value={tool}>
      <Import importZip={importZip} />
      <Export/>
      <Pen />
      <Brush />
      <Eraser />
      <Undo />
      <Redo />
    </Radio.Group>
  )
}

ToolBox.propTypes = {
  importZip: PropTypes.func.isRequired,
  exportZip: PropTypes.func.isRequired,
}

export default ToolBox;
