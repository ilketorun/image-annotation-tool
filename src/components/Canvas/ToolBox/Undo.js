import React from "react";
import { UndoOutlined } from '@ant-design/icons';
import { Radio } from "antd";

import { TOOLS } from "@constants";

import styles from './styles.module.css';

const Undo = () => {
  return (
    <Radio.Button className={styles.button} value={TOOLS.UNDO}>
      <div className={styles.tool}>
        Undo
        <UndoOutlined />
      </div>
    </Radio.Button>
  )
};

export default Undo;