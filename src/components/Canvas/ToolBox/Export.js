import React from "react";
import { ExportOutlined } from '@ant-design/icons';
import styles from './styles.module.css';

const Export = () => {
  return (
    <div className={styles.tool}>
      Export
      <ExportOutlined />
    </div>
  )
};

export default Export;