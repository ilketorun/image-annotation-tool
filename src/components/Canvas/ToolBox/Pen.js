import React from "react";
import { EditOutlined } from '@ant-design/icons';
import { Radio } from "antd";

import { TOOLS } from "@constants";

import styles from './styles.module.css';

const Pen = () => {
  return (
    <Radio.Button className={styles.button} value={TOOLS.PEN}>
      <div className={styles.tool}>
        Pen
        <EditOutlined />
      </div>
    </Radio.Button>
  )
};

export default Pen;