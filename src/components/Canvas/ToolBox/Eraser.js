import React from "react";
import { BorderOutlined } from '@ant-design/icons';
import { Radio } from "antd";

import { TOOLS } from "@constants";

import styles from './styles.module.css';

const Eraser = () => {
  return (
    <Radio.Button className={styles.button} value={TOOLS.ERASER}>
      <div className={styles.tool}>
        Eraser
        <BorderOutlined />
      </div>
    </Radio.Button>
  )
};

export default Eraser;

