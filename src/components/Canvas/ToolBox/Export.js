import React from "react";
import { ExportOutlined } from '@ant-design/icons';
import { Radio } from "antd";

import { TOOLS } from "@constants";

import styles from './styles.module.css';

const Export = () => {
  return (
    <Radio.Button className={styles.button} value={TOOLS.EXPORT}>
      <div className={styles.tool}>
        Export
        <ExportOutlined />
      </div>
    </Radio.Button>
  )
};

export default Export;