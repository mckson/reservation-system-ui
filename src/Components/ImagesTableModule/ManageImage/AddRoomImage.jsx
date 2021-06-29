import React, { useState } from 'react';
import PropTypes from 'prop-types';
import AddImageComponent from './AddImageComponent';

const AddRoomImage = ({ open, close, roomId, createImage, onSuccess }) => {
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState(false);

  const handleCreateImageAsync = async (imageData) => {
    const createdImage = {
      image: imageData.image,
      name: imageData.name,
      type: imageData.type,
      roomId,
    };

    setProcessing(true);
    // eslint-disable-next-line no-unused-vars
    const errorResponse = await createImage(createdImage);
    setProcessing(false);

    if (errorResponse != null) {
      setError(errorResponse);
    } else {
      onSuccess('Image successfully added');
      close();
    }
  };

  const handleError = (err) => {
    setError(err);
  };

  return (
    <AddImageComponent
      open={open}
      close={close}
      error={error}
      onError={handleError}
      processing={processing}
      onCreateImage={handleCreateImageAsync}
      title="Add room's image"
    />
  );
};

AddRoomImage.propTypes = {
  open: PropTypes.bool.isRequired,
  close: PropTypes.func.isRequired,
  roomId: PropTypes.string.isRequired,
  createImage: PropTypes.func.isRequired,
  onSuccess: PropTypes.func.isRequired,
};

export default AddRoomImage;
