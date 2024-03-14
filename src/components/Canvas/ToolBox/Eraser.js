import React from "react";
import { BorderOutlined } from '@ant-design/icons';
import styles from './styles.module.css';

const Eraser = () => {
  return (
    <div className={styles.tool}>
      Eraser
      <BorderOutlined />
    </div>
  )
};

export default Eraser;

