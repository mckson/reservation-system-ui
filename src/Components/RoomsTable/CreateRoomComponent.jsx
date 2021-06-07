import React from 'react';
import PropTypes from 'prop-types';
import RoomForm from './RoomForm';
import Hotel from '../../Models/Hotel';

const CreateRoomComponent = ({ close, open, hotel, createRoom }) => {
  const onCreateRoom = (values) => {
    const createdRoom = {
      hotelId: hotel.id,
      roomNumber: parseInt(values.number, 10),
      floorNumber: parseInt(values.floor, 10),
      price: parseFloat(values.price),
      capacity: parseInt(values.capacity, 10),
    };
    createRoom(createdRoom);
    close();
  };

  return (
    <RoomForm
      open={open}
      close={close}
      room={null}
      submitHandler={onCreateRoom}
      title="Room creation"
      submitText="Create room"
    />
  );
};

CreateRoomComponent.propTypes = {
  open: PropTypes.bool.isRequired,
  close: PropTypes.func.isRequired,
  hotel: PropTypes.instanceOf(Hotel).isRequired,
  createRoom: PropTypes.func.isRequired,
};

export default CreateRoomComponent;
