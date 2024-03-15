import React from "react";

import { ImportOutlined } from '@ant-design/icons';
import { Upload } from 'antd';
import { PropTypes } from 'prop-types';

import styles from './styles.module.css';

const Import = ({ importZip }) => {
  return (
    <Upload
      beforeUpload={file => {
        importZip({ target: { files: [file] }});
        return false;
      }}
      showUploadList={false}
      accept=".zip"
    >
      <div className={styles.tool}>
        Import
        <ImportOutlined />
      </div>
    </Upload>
    
  )
};

Import.propTypes = {
  importZip: PropTypes.func.isRequired,
}


export default Import;