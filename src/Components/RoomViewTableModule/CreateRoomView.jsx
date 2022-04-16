import React, { useState } from 'react';
import PropTypes from 'prop-types';
import RoomViewForm from './RoomViewForm/RoomViewForm';
import BaseDialog from '../../Common/BaseDialog';
import RoomView from '../../Models/RoomView';
import RoomViewWarningContentComponent from './RoomViewWarningContentComponent';

const CreateRoomView = ({ open, close, createRoomView, onSuccess }) => {
  const [error, setError] = useState(null);
  const [creatingRoomView, setCreatingRoomView] = useState(null);

  const createRoomViewAsync = async () => {
    const [roomViewResponse, errorResponse] = await createRoomView(
      creatingRoomView
    );

    if (errorResponse != null) {
      setError(errorResponse);
    } else {
      onSuccess(`Room view ${roomViewResponse.name} sucessfully added`);
      setCreatingRoomView(null);
      close();
    }
  };

  const handleSubmit = (values) => {
    const newRoomView = new RoomView(values);

    setCreatingRoomView(newRoomView);
  };

  const handleCancel = () => {
    setError('Creating canceled');
  };

  const handleAccept = async () => {
    if (creatingRoomView) {
      await createRoomViewAsync();
    }
  };

  const handleResetError = () => {
    setError(null);
  };

  const warningContent = (
    <RoomViewWarningContentComponent
      text={`Room view "${creatingRoomView?.name}" is going to be created. Accept or decline the creating`}
      roomView={creatingRoomView}
    />
  );

  const formTitle = 'Room view creation';
  const formSubmitText = 'Create view';
  return (
    <BaseDialog open={open} close={close} title={formTitle}>
      <RoomViewForm
        submitText={formSubmitText}
        submitHandler={handleSubmit}
        error={error}
        resetError={handleResetError}
        onCancel={handleCancel}
        onAccept={handleAccept}
        roomView={creatingRoomView}
        type="create"
        warningContent={warningContent}
        warningTitle="Creating of the view"
      />
    </BaseDialog>
  );
};

CreateRoomView.propTypes = {
  open: PropTypes.bool.isRequired,
  close: PropTypes.func.isRequired,
  createRoomView: PropTypes.func.isRequired,
  onSuccess: PropTypes.func.isRequired,
};

export default CreateRoomView;
