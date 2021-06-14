import React from 'react';
import PropTypes from 'prop-types';
import Hotel from '../../../Models/Hotel';
import HotelRowComponent from './HotelRowComponent';
import User from '../../../Models/User';

const HotelRow = ({
  users,
  hotel,
  deleteHotel,
  updateHotel,
  createRoom,
  updateRoom,
  deleteRoom,
  createService,
  updateService,
  deleteService,
  updateUser,
  deleteImage,
  createImage,
  onError,
  onSuccess,
}) => {
  return (
    <HotelRowComponent
      users={users}
      hotel={hotel}
      deleteHotel={deleteHotel}
      updateHotel={updateHotel}
      createRoom={createRoom}
      updateRoom={updateRoom}
      deleteRoom={deleteRoom}
      createService={createService}
      updateService={updateService}
      deleteService={deleteService}
      updateUser={updateUser}
      createImage={createImage}
      deleteImage={deleteImage}
      onSuccess={onSuccess}
      onError={onError}
    />
  );
};

HotelRow.propTypes = {
  users: PropTypes.arrayOf(User).isRequired,
  hotel: PropTypes.instanceOf(Hotel).isRequired,
  deleteHotel: PropTypes.func.isRequired,
  updateHotel: PropTypes.func.isRequired,
  createRoom: PropTypes.func.isRequired,
  createService: PropTypes.func.isRequired,
  updateService: PropTypes.func.isRequired,
  deleteService: PropTypes.func.isRequired,
  updateRoom: PropTypes.func.isRequired,
  deleteRoom: PropTypes.func.isRequired,
  updateUser: PropTypes.func.isRequired,
  createImage: PropTypes.func.isRequired,
  deleteImage: PropTypes.func.isRequired,
  onError: PropTypes.func.isRequired,
  onSuccess: PropTypes.func.isRequired,
};

export default HotelRow;
