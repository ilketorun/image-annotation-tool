import React from "react";
import { UndoOutlined } from '@ant-design/icons';
import styles from './styles.module.css';

const Undo = () => {
  return (
    <div className={styles.tool}>
      Undo
      <UndoOutlined />
    </div>
  )
};

export default Undo;