import React from "react";
import { HighlightOutlined } from '@ant-design/icons';
import { Radio } from "antd";

import { TOOLS } from "@constants";

import styles from './styles.module.css';

const Brush = () => {
  return (
    <Radio.Button className={styles.button} value={TOOLS.BRUSH}>
      <div className={styles.tool}>
        Brush
        <HighlightOutlined />
      </div>
    </Radio.Button>
  )
};

export default Brush;