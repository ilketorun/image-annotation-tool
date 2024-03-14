import React from "react";
import { ImportOutlined } from '@ant-design/icons';
import styles from './styles.module.css';

const Import = () => {
  return (
    <div className={styles.tool}>
      Import
      <ImportOutlined />
    </div>
  )
};

export default Import;