const convertBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    // eslint-disable-next-line no-debugger
    debugger;
    fileReader.readAsDataURL(file);
    fileReader.onload = () => {
      console.log(file);
      resolve(fileReader.result);
    };

    fileReader.onerror = (err) => {
      reject(err);
    };
  });
};

const imageModelToFileAsync = async (imageResponse) => {
  const response = await fetch(imageResponse.image);
  const blob = await response.blob();
  const file = new File([blob], imageResponse.name, {
    type: imageResponse.type,
  });
  // eslint-disable-next-line no-debugger
  debugger;

  return file;
};

const fileToImageModelAsync = async (file) => {
  const base64 = await convertBase64(file);

  const imageModel = {
    image: base64,
    type: file.type,
    name: file.name,
  };

  return imageModel;
};

// const bytesToImageModelAsync = async (bytes) => {
//   const base64 = btoa(bytes);

//   console.log(base64);

//   // eslint-disable-next-line no-debugger
//   debugger;
//   // const imageModel = {
//   //   image: base64,
//   //   type: file.type,
//   //   name: file.name,
//   // };

//   // return imageModel;
// };

// const fileResultToImageModel = async (fileResult) => {
//   console.log(fileResult);

//   // eslint-disable-next-line no-debugger
//   debugger;
//   // const blob = new Blob([fileResult.data], {
//   //   type: fileResult.headers['content-type'],
//   // });
//   // const base64 = await convertBase64(blob);

//   const readre = new Promise((resolve) => {
//     const fileReader = new FileReader();

//     fileReader.readAsText(fileResult.data, fileResult.headers['content-type']);

//     fileReader.onload = () => {
//       console.log(fileResult);
//       resolve(fileReader.result);
//     };
//   });

//   const resutl = await readre;
//   console.log(resutl);
//   // const base64 = window.btoa(unescape(encodeURIComponent(fileResult.data)));

//   // // eslint-disable-next-line no-debugger
//   // debugger;

//   // const imageModel = {
//   //   image: base64,
//   //   type: fileResult.type,
//   //   name: fileResult.name,
//   // };

//   // return imageModel;
// };

export default {
  imageModelToFileAsync,
  fileToImageModelAsync,
  // fileResultToImageModel,
};
