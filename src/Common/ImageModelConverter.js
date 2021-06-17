const convertBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
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

const bytesToImageModelAsync = async (bytes) => {
  const base64 = btoa(bytes);

  console.log(base64);

  // eslint-disable-next-line no-debugger
  debugger;
  // const imageModel = {
  //   image: base64,
  //   type: file.type,
  //   name: file.name,
  // };

  // return imageModel;
};

export default {
  imageModelToFileAsync,
  fileToImageModelAsync,
  bytesToImageModelAsync,
};
