import React, { useState } from "react";
import { CanvasShape } from '@components';
import useImage from 'use-image';

const App = () => {

  const [backgroundUrl, setBackgroundUrl] = useState(null);
  const [backgroundImage] = useImage(backgroundUrl);

  const handleUpload = event => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        // Set the background URL to the result of the FileReader
        setBackgroundUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };


  return (
    <div className="App">
      <header className="App-header">
        <input type="file" onChange={handleUpload} accept="image/*" />
        <CanvasShape backgroundImage={backgroundImage} />
      </header>
    </div>
  );
}

export default App;
