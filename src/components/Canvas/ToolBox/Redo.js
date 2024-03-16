import React from "react";
import { RedoOutlined } from '@ant-design/icons';
import { Radio } from "antd";

import { TOOLS } from "@constants";

import styles from './styles.module.css';

const Redo = () => {
  return (
    <Radio.Button className={styles.button} value={TOOLS.REDO}>
      <div className={styles.tool}>
        Redo
        <RedoOutlined />
      </div>
    </Radio.Button>
  )
};

export default Redo;