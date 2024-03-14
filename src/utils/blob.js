const dataURLtoBlob = (dataURL) => {
  console.log('dataURL:', dataURL)
  // Decode the dataURL
  const byteString = atob(dataURL.split(',')[1]);

  console.log('byteString:', byteString)


  // Extract the MIME type from the dataURL
  const mimeString = dataURL.split(',')[0].split(':')[1].split(';')[0];

  console.log('mimeString:', mimeString)

  // Construct a byte array (typed array)
  const ia = new Uint8Array(byteString.length);
  for (let i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }

  // Use the typed array to create a Blob object
  return new Blob([ia], {type: mimeString});
}

export { dataURLtoBlob };