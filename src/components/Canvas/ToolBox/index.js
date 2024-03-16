import React, { useContext } from "react";
import { Radio } from 'antd';
import { PropTypes } from "prop-types";

import { TOOLS } from "@constants";
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
      <Radio.Button className={styles.importButton} value={TOOLS.IMPORT}>
        <Import importZip={importZip} />
      </Radio.Button>
      <Radio.Button className={styles.button} value={TOOLS.EXPORT}>
        <Export/>
      </Radio.Button>
      <Radio.Button className={styles.button} value={TOOLS.PEN}>
        <Pen />
      </Radio.Button>
      <Radio.Button className={styles.button} value={TOOLS.BRUSH}>
        <Brush />
      </Radio.Button>
      <Radio.Button className={styles.button} value={TOOLS.ERASER}>
        <Eraser />
      </Radio.Button>
      <Radio.Button className={styles.button} value={TOOLS.UNDO}>
        <Undo />
      </Radio.Button>
      <Radio.Button className={styles.button} value={TOOLS.REDO}>
        <Redo />
      </Radio.Button>
    </Radio.Group>
  )
}

ToolBox.propTypes = {
  importZip: PropTypes.func.isRequired,
  exportZip: PropTypes.func.isRequired,
}

export default ToolBox;
