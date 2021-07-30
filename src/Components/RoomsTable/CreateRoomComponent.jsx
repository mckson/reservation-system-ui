import React, { useState } from 'react';
import PropTypes from 'prop-types';
import RoomForm from './RoomForm';
import Hotel from '../../Models/Hotel';
import RoomView from '../../Models/RoomView';
import RoomWarningContentComponent from './RoomWarningContentComponent';

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
  const [creatingRoom, setCreatingRoom] = useState(null);

  const createRoomAsync = async () => {
    const [roomResponse, errorResponse] = await createRoom(creatingRoom);

    if (errorResponse) {
      setError(errorResponse);
    } else {
      onSuccess(`Room ${roomResponse.roomNumber} sucessfully added`);
      close();
      onRefresh();
    }
  };

  const handleSubmit = (values) => {
    const newRoom = {
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

    setCreatingRoom(newRoom);
  };

  const handleCancel = () => {
    setError('Creating canceled');
  };

  const handleAccept = async () => {
    if (creatingRoom) {
      await createRoomAsync();
    }
  };

  const warningContent = (
    <RoomWarningContentComponent
      text={`Room view "${creatingRoom?.name}" is going to be created. Accept or decline the creating`}
      room={creatingRoom}
    />
  );

  const handleResetError = () => {
    setError(null);
  };

  return (
    <RoomForm
      open={open}
      close={close}
      roomViews={roomViews}
      room={null}
      submitHandler={handleSubmit}
      title="Room creation"
      submitText="Create room"
      error={error}
      resetError={handleResetError}
      onAccept={handleAccept}
      onCancel={handleCancel}
      warningContent={warningContent}
      warningTitle="Creating of the room"
      type="create"
      acceptText="Create room"
      cancelText="Cancel"
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
