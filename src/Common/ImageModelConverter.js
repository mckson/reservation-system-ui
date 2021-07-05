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

export default {
  imageModelToFileAsync,
  fileToImageModelAsync,
};
