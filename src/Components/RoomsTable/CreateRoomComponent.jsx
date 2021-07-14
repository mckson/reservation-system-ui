import React, { useState } from 'react';
import PropTypes from 'prop-types';
import RoomForm from './RoomForm';
import Hotel from '../../Models/Hotel';
import RoomView from '../../Models/RoomView';

const CreateRoomComponent = ({
  close,
  open,
  roomViews,
  hotel,
  createRoom,
  onSuccess,
  onRefresh,
}) => {
  const [error, setError] = useState(null);

  const onCreateRoom = async (values) => {
    const createdRoom = {
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

    const [roomResponse, errorResponse] = await createRoom(createdRoom);

    if (errorResponse) {
      setError(errorResponse);
    } else {
      onSuccess(`Room ${roomResponse.roomNumber} sucessfully added`);
      close();
      onRefresh();
    }
  };

  const handleResetError = () => {
    setError(null);
  };

  return (
    <RoomForm
      open={open}
      close={close}
      roomViews={roomViews}
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
  roomViews: PropTypes.arrayOf(RoomView),
  hotel: PropTypes.instanceOf(Hotel).isRequired,
  createRoom: PropTypes.func.isRequired,
  onSuccess: PropTypes.func.isRequired,
  onRefresh: PropTypes.func.isRequired,
};

CreateRoomComponent.defaultProps = {
  roomViews: [],
};

export default CreateRoomComponent;
