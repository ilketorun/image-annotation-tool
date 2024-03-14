import React from "react";
import { HighlightOutlined } from '@ant-design/icons';
import styles from './styles.module.css';

const Brush = () => {
  return (
    <div className={styles.tool}>
      Brush
      <HighlightOutlined />
    </div>
  )
};

export default Brush;