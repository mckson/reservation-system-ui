import React from 'react';
import PropTypes from 'prop-types';
import HotelsTableComponent from './HotelsTableComponent';
import Hotel from '../../../Models/Hotel';
import User from '../../../Models/User';

const HotelsTable = ({
  role,
  users,
  hotels,
  totalCount,
  pageChanged,
  pageSize,
  pageSizeChanged,
  deleteHotel,
  updateHotel,
  createHotel,
  createRoom,
  updateRoom,
  deleteRoom,
  createService,
  updateService,
  deleteService,
  updateUser,
  createImage,
  deleteImage,
  createRoomImage,
  deleteRoomImage,
  onError,
  onSuccess,
}) => {
  return (
    <HotelsTableComponent
      role={role}
      users={users}
      hotels={hotels}
      totalCount={totalCount}
      pageChanged={pageChanged}
      pageSize={pageSize}
      pageSizeChanged={pageSizeChanged}
      deleteHotel={deleteHotel}
      updateHotel={updateHotel}
      createHotel={createHotel}
      createRoom={createRoom}
      updateRoom={updateRoom}
      deleteRoom={deleteRoom}
      createService={createService}
      updateService={updateService}
      deleteService={deleteService}
      updateUser={updateUser}
      createImage={createImage}
      deleteImage={deleteImage}
      createRoomImage={createRoomImage}
      deleteRoomImage={deleteRoomImage}
      onError={onError}
      onSuccess={onSuccess}
    />
  );
};

HotelsTable.propTypes = {
  role: PropTypes.string.isRequired,
  users: PropTypes.arrayOf(User).isRequired,
  hotels: PropTypes.arrayOf(Hotel).isRequired,
  totalCount: PropTypes.number.isRequired,
  pageChanged: PropTypes.func.isRequired,
  pageSizeChanged: PropTypes.func.isRequired,
  pageSize: PropTypes.number.isRequired,
  deleteHotel: PropTypes.func.isRequired,
  updateHotel: PropTypes.func.isRequired,
  createHotel: PropTypes.func.isRequired,
  createRoom: PropTypes.func.isRequired,
  updateRoom: PropTypes.func.isRequired,
  deleteRoom: PropTypes.func.isRequired,
  createService: PropTypes.func.isRequired,
  updateService: PropTypes.func.isRequired,
  deleteService: PropTypes.func.isRequired,
  updateUser: PropTypes.func.isRequired,
  createImage: PropTypes.func.isRequired,
  deleteImage: PropTypes.func.isRequired,
  createRoomImage: PropTypes.func.isRequired,
  deleteRoomImage: PropTypes.func.isRequired,
  onError: PropTypes.func.isRequired,
  onSuccess: PropTypes.func.isRequired,
};

export default HotelsTable;
