import React, { useState } from 'react';
import PropTypes from 'prop-types';
import RoomViewForm from './RoomViewForm/RoomViewForm';
import BaseDialog from '../../Common/BaseDialog';

const CreateRoomView = ({ open, close, createRoomView, onSuccess }) => {
  const [error, setError] = useState(null);

  const onCreateRoomViewAsync = async (values) => {
    const createdroomView = {
      name: values.name,
    };

    const [roomViewResponse, errorResponse] = await createRoomView(
      createdroomView
    );

    if (errorResponse != null) {
      setError(errorResponse);
    } else {
      onSuccess(`Room view ${roomViewResponse.name} sucessfully added`);
      close();
    }
  };

  const handleResetError = () => {
    setError(null);
  };

  const formTitle = 'Room view creation';
  const formSubmitText = 'Create view';
  return (
    <BaseDialog
      open={open}
      close={close}
      title={formTitle}
      contentComponent={
        <RoomViewForm
          submitText={formSubmitText}
          submitHandler={onCreateRoomViewAsync}
          error={error}
          resetError={handleResetError}
        />
      }
    />
  );
};

CreateRoomView.propTypes = {
  open: PropTypes.bool.isRequired,
  close: PropTypes.func.isRequired,
  createRoomView: PropTypes.func.isRequired,
  onSuccess: PropTypes.func.isRequired,
};

export default CreateRoomView;
