import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Hotel from '../../Models/Hotel';
import Room from '../../Models/Room';
import RoomForm from './RoomForm';

const EditRoomComponent = ({
  open,
  close,
  onRefresh,
  room,
  hotel,
  updateRoom,
  onSuccess,
}) => {
  const [error, setError] = useState(null);

  const onUpdateRoom = async (values) => {
    const updatedRoom = {
      id: room.id,
      hotelId: hotel.id,
      name: values.name,
      roomNumber: parseInt(values.number, 10),
      floorNumber: parseInt(values.floor, 10),
      price: parseFloat(values.price),
      capacity: parseInt(values.capacity, 10),
      area: parseFloat(values.area),
      description: values.description,
      smoking: values.smoking,
      parking: values.parking,
      facilities: values.facilities,
      views: values.views,
    };
    console.log(updatedRoom);
    const [roomResponse, errorResponse] = await updateRoom(updatedRoom);

    if (errorResponse != null) {
      setError(errorResponse);
    } else {
      onSuccess(`Room ${roomResponse.roomNumber} sucessfully updated`);
      onRefresh();
      close();
    }
  };

  const handleResetError = () => {
    setError(null);
  };

  return (
    <RoomForm
      open={open}
      close={close}
      room={room}
      submitHandler={onUpdateRoom}
      title={`Room with id ${room.id} update`}
      submitText="Apply changes"
      error={error}
      resetError={handleResetError}
    />
  );
};

EditRoomComponent.propTypes = {
  open: PropTypes.bool.isRequired,
  close: PropTypes.func.isRequired,
  onRefresh: PropTypes.func.isRequired,
  room: PropTypes.instanceOf(Room).isRequired,
  hotel: PropTypes.instanceOf(Hotel).isRequired,
  updateRoom: PropTypes.func.isRequired,
  onSuccess: PropTypes.func.isRequired,
};

export default EditRoomComponent;
