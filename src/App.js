import React, { useEffect } from "react";
import { CanvasShape } from '@components';
import { useZipUpload } from '@hooks';

const App = () => {
  const { imageSrc, handleZipUpload } = useZipUpload();

  const image = new Image();

  useEffect(() => {
    image.src = imageSrc;
  }, [imageSrc]);

  return (
    <div className="App">
      <header className="App-header">
        <input type="file" onChange={handleZipUpload} accept=".zip" />
        {imageSrc && <CanvasShape backgroundImage={image} />}
      </header>
    </div>
  );
}

export default App;
