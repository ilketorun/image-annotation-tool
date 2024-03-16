import React from "react";

import { ImportOutlined } from '@ant-design/icons';
import { Radio, Upload } from 'antd';
import { PropTypes } from 'prop-types';

import { TOOLS } from "@constants";

import styles from './styles.module.css';

const Import = ({ importZip }) => {
  return (
    <Radio.Button className={styles.importButton} value={TOOLS.IMPORT}>
      <Upload
        beforeUpload={file => {
          importZip({ target: { files: [file] }});
          return false;
        }}
        showUploadList={false}
        accept=".zip"
      >
        <div 
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '73px',
          }}
        >
          Import
          <ImportOutlined />
        </div>
      </Upload>
    </Radio.Button>
  )
};

Import.propTypes = {
  importZip: PropTypes.func.isRequired,
}


export default Import;