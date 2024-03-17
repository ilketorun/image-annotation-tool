import { useEffect, useState } from 'react';
import JSZip from 'jszip';
import { DEFAULT_CANVAS_HEIGHT, DEFAULT_CANVAS_WIDTH } from '@constants';

const useImportZip = () => {
  const [imageSrc, setImageSrc] = useState(null);
  const [imageBlob, setImageBlob] = useState(null);
  const [imageDimensions, setImageDimensions] = useState({ width: 0, height: 0 });
  const [imagePositions, setImagePositions] = useState({ x: 0, y: 0 });
  const [canvasSize, setCanvasSize] = useState({
    width: DEFAULT_CANVAS_WIDTH,
    height: DEFAULT_CANVAS_HEIGHT,
  });

  useEffect(() => {
    function handleResize() {
      const { innerWidth, innerHeight } = window;
      setCanvasSize({
        width: Math.min(DEFAULT_CANVAS_WIDTH, innerWidth * 0.93),
        height: Math.min(DEFAULT_CANVAS_HEIGHT, innerHeight * 0.93),
      });
    }

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const importZip = (event) => {
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

            createImageBitmap(blob).then((bitmap) => {
              const dimensions = { width: bitmap.width, height: bitmap.height };                
              const aspectRatio = dimensions.width / dimensions.height;
              let width = canvasSize.width;
              let height = canvasSize.height;
              
              if (dimensions.width > dimensions.height) {
                width = canvasSize.width;
                height = width / aspectRatio;
              } else {
                height = canvasSize.height;
                width = height * aspectRatio;
              }
              setImageDimensions({ width, height });      
              const imageX = (canvasSize.width - width) / 2;
              const imageY = (canvasSize.height - height) / 2;
              setImagePositions({ x: imageX, y: imageY });
            }).catch((error) => {
              console.error("Error creating image bitmap:", error);
            });

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

  return { canvasSize, imageDimensions, imagePositions, imageSrc, imageBlob, importZip };
};

export default useImportZip;