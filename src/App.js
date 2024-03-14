import React, { useEffect, useRef } from "react";
import { CanvasShape } from '@components';
import { useZipUpload } from '@hooks';
import { dataURLtoBlob } from '@utils';
import { saveAs } from 'file-saver';
import JSZip from "jszip";

const App = () => {
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
    <div className="App">
      <header className="App-header">
        <input type="file" onChange={handleZipUpload} accept=".zip" />
        {imageSrc && <CanvasShape backgroundImage={image} ref={drawingLayer} />}
        <button onClick={exportAsZip}>Export</button>
      </header>
    </div>
  );
}

export default App;
