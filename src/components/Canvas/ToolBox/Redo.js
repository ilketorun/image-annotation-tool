import React from "react";
import { RedoOutlined } from '@ant-design/icons';
import styles from './styles.module.css';

const Redo = () => {
  return (
    <div className={styles.tool}>
      Redo
      <RedoOutlined />
    </div>
  )
};

export default Redo;