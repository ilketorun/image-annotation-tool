import { useState } from 'react';
import JSZip from 'jszip';

const useZipUpload = () => {
  const [imageSrc, setImageSrc] = useState(null);
  const [imageBlob, setImageBlob] = useState(null);

  const handleZipUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const zip = new JSZip();
    zip.loadAsync(file)
      .then((zipContents) => {
        // Filter PNG files in the ZIP
        const pngFiles = Object.keys(zipContents.files).filter((fileName) => fileName.endsWith('.png') && !fileName.startsWith('__MACOSX'));

        // Check if there's exactly one PNG file
        if (pngFiles.length === 1) {
          // Extract and read the PNG file
          zipContents.files[pngFiles[0]].async('blob').then((blob) => {
            setImageBlob(blob);
            const url = URL.createObjectURL(blob);
            setImageSrc(url);
          });
        } else {
          alert('The ZIP file must contain exactly one PNG image.');
          event.target.value = null;
          setImageSrc(null);
        }
      })
      .catch((err) => {
        console.error('Error reading ZIP file:', err);
        alert('There was an error processing the ZIP file.');
        setImageSrc(null);
      });
  };

  return { imageSrc, imageBlob, handleZipUpload };
};

export default useZipUpload;