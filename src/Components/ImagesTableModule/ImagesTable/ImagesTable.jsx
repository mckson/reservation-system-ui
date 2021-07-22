import React, { useState } from 'react';
import PropTypes from 'prop-types';
import ImagesTableComponent from './ImagesTableComponent';
import AddHotelImage from '../ManageImage/AddHotelImage';
import AddRoomImage from '../ManageImage/AddRoomImage';

const ImagesTable = ({
  hotelId,
  roomId,
  images,
  deleteImage,
  createImage,
  onSuccess,
  onError,
}) => {
  const [isCreate, setIsCreate] = useState(false);

  const handleCreateClose = () => {
    setIsCreate(false);
  };

  const handleCreateOpen = () => {
    setIsCreate(true);
  };

  return (
    <>
      <ImagesTableComponent
        images={images}
        deleteImage={deleteImage}
        onSuccess={onSuccess}
        onError={onError}
        openCreate={handleCreateOpen}
      />
      {roomId ? (
        <AddRoomImage
          open={isCreate}
          close={handleCreateClose}
          createImage={createImage}
          roomId={roomId}
          onSuccess={onSuccess}
        />
      ) : (
        <AddHotelImage
          open={isCreate}
          close={handleCreateClose}
          createImage={createImage}
          hotelId={hotelId}
          onSuccess={onSuccess}
        />
      )}
    </>
  );
};

ImagesTable.propTypes = {
  hotelId: PropTypes.string,
  roomId: PropTypes.string,
  images: PropTypes.arrayOf(PropTypes.string).isRequired,
  deleteImage: PropTypes.func.isRequired,
  createImage: PropTypes.func.isRequired,
  onSuccess: PropTypes.func.isRequired,
  onError: PropTypes.func.isRequired,
};

ImagesTable.defaultProps = {
  hotelId: null,
  roomId: null,
};

export default ImagesTable;
