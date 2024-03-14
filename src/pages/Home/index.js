import React, { useEffect, useRef } from "react";
import { Canvas } from "@components";
import { saveAs } from 'file-saver';
import JSZip from "jszip";
import { Button, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { useZipUpload } from "@hooks";
import { dataURLtoBlob } from "@utils";

// Custom upload button for Ant Design's Upload component
const uploadButton = (
  <Button icon={<UploadOutlined />}>Click to Upload</Button>
);

const Home = () => {
  const drawingLayer = useRef(); // 'drawingLayer' is the ref to layer containing the shapes
  const image = new Image();
  const { imageSrc, imageBlob, handleZipUpload } = useZipUpload();

  useEffect(() => {
    image.src = imageSrc;
  }, [imageSrc]);

  const exportAsZip = () => {
    const zip = new JSZip();
    const imgFolder = zip.folder("images");

    const dataURL = drawingLayer.current.toDataURL({
      pixelRatio: 1,
      mimeType: "image/png",
    },);

    const maskBlob = dataURLtoBlob(dataURL);
    imgFolder.file("mask.png", maskBlob, { binary: true });
    imgFolder.file("original_image.png", imageBlob, { binary: true });

    zip.generateAsync({ type: "blob" })
    .then(function(content) {
      saveAs(content, "images.zip");
    });
  };
  
  return (
    <div>
      <Upload
        beforeUpload={file => {
          handleZipUpload({ target: { files: [file] } });
          return false;
        }}
        showUploadList={false}
      >
        {uploadButton}
      </Upload>
      <Button type="primary" onClick={exportAsZip}>Export</Button>
      {imageSrc && <Canvas backgroundImage={image} ref={drawingLayer} />}
    </div>
  );
}

export default Home;