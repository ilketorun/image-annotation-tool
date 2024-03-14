import React from "react";
import { EditOutlined } from '@ant-design/icons';
import styles from './styles.module.css';

const Pen = () => {
  return (
    <div className={styles.tool}>
      Pen
      <EditOutlined />
    </div>
  )
};

export default Pen;