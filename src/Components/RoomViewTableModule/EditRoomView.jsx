import React, { useState } from 'react';
import PropTypes from 'prop-types';
import BaseDialog from '../../Common/BaseDialog';
import RoomViewForm from './RoomViewForm/RoomViewForm';
import RoomView from '../../Models/RoomView';

const EditRoomView = ({ open, close, roomView, updateRoomView, onSuccess }) => {
  const [error, setError] = useState(null);

  const formTitle = `Service wih id ${roomView.id} update`;
  const formSubmitText = 'Apply changes';

  const onUpdateRoomViewAsync = async (values) => {
    const updatedRoomView = {
      id: roomView.id,
      name: values.name,
    };

    const [roomViewResponse, errorResponse] = await updateRoomView(
      updatedRoomView
    );

    if (errorResponse) {
      setError(errorResponse);
    } else {
      onSuccess(`Room view ${roomViewResponse.name} successfully updated`);
      close();
    }
  };

  const handleResetError = () => {
    setError(null);
  };

  return (
    <BaseDialog
      open={open}
      close={close}
      title={formTitle}
      contentComponent={
        <RoomViewForm
          roomView={roomView}
          submitText={formSubmitText}
          submitHandler={onUpdateRoomViewAsync}
          error={error}
          resetError={handleResetError}
        />
      }
    />
  );
};

EditRoomView.propTypes = {
  open: PropTypes.bool.isRequired,
  close: PropTypes.func.isRequired,
  updateRoomView: PropTypes.func.isRequired,
  roomView: PropTypes.instanceOf(RoomView).isRequired,
  onSuccess: PropTypes.func.isRequired,
};

export default EditRoomView;
