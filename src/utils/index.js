const dataURLtoBlob = (dataURL) => {
  // Decode the dataURL
  const byteString = atob(dataURL.split(',')[1]);

  // Extract the MIME type from the dataURL
  const mimeString = dataURL.split(',')[0].split(':')[1].split(';')[0];

  // Construct a byte array (typed array)
  const ia = new Uint8Array(byteString.length);
  for (let i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }

  // Use the typed array to create a Blob object
  return new Blob([ia], {type: mimeString});
}

const createBlackImageDataUrl = (width = 1, height = 1) => {
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  
  ctx.fillStyle = 'black'; // Set the fill color to black
  ctx.fillRect(0, 0, width, height); // Fill the canvas with black
  
  return canvas.toDataURL(); // Convert the canvas to a data URL and return it
};

export { dataURLtoBlob, createBlackImageDataUrl };