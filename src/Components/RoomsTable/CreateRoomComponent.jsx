import React, { useState } from 'react';
import PropTypes from 'prop-types';
import RoomForm from './RoomForm';
import Hotel from '../../Models/Hotel';

const CreateRoomComponent = ({ close, open, hotel, createRoom, onSuccess }) => {
  const [error, setError] = useState(null);

  const onCreateRoom = async (values) => {
    const createdRoom = {
      hotelId: hotel.id,
      roomNumber: parseInt(values.number, 10),
      floorNumber: parseInt(values.floor, 10),
      price: parseFloat(values.price),
      capacity: parseInt(values.capacity, 10),
    };

    const errorResponse = await createRoom(createdRoom);

    if (errorResponse) {
      setError(errorResponse);
    } else {
      onSuccess('Room sucessfully added');
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
      room={null}
      submitHandler={onCreateRoom}
      title="Room creation"
      submitText="Create room"
      error={error}
      resetError={handleResetError}
    />
  );
};

CreateRoomComponent.propTypes = {
  open: PropTypes.bool.isRequired,
  close: PropTypes.func.isRequired,
  hotel: PropTypes.instanceOf(Hotel).isRequired,
  createRoom: PropTypes.func.isRequired,
  onSuccess: PropTypes.func.isRequired,
};

export default CreateRoomComponent;
