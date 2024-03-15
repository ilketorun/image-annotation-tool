import React from "react";

import { ImportOutlined } from '@ant-design/icons';
import { Upload } from 'antd';
import { PropTypes } from 'prop-types';

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
    
  )
};

Import.propTypes = {
  importZip: PropTypes.func.isRequired,
}


export default Import;