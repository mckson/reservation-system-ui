import React, { useState } from 'react';
import PropTypes from 'prop-types';
import * as Yup from 'yup';
import RoomViewFormComponent from './RoomViewFormComponent';
import RoomView from '../../../Models/RoomView';
import RoomViewWarningContentComponent from '../RoomViewWarningContentComponent';

const validationSchema = Yup.object({
  name: Yup.string()
    .max(200, 'Must be 200 characters or less')
    .min(2, 'Must be 2 characters or more')
    .required('Required'),
});

const RoomViewForm = ({
  roomView,
  submitHandler,
  submitText,
  error,
  resetError,
  onCancel,
  onAccept,
  type,
  warningContent,
  warningTitle,
}) => {
  const [openWarning, setOpenWarning] = useState(false);

  const handleOpenWarning = () => {
    setOpenWarning(true);
  };

  const handleCloseWarning = () => {
    setOpenWarning(false);
  };

  return (
    <RoomViewFormComponent
      roomView={roomView}
      validationSchema={validationSchema}
      submitHandler={submitHandler}
      submitText={submitText}
      error={error}
      resetError={resetError}
      onAccept={onAccept}
      onCancel={onCancel}
      openWarning={openWarning}
      onOpenWarning={handleOpenWarning}
      onCloseWarning={handleCloseWarning}
      type={type}
      warningContent={warningContent}
      warningTitle={warningTitle}
    />
  );
};

RoomViewForm.propTypes = {
  roomView: PropTypes.instanceOf(RoomView),
  submitHandler: PropTypes.func.isRequired,
  submitText: PropTypes.string,
  error: PropTypes.string,
  resetError: PropTypes.func.isRequired,
  onCancel: PropTypes.func,
  onAccept: PropTypes.func,
  type: PropTypes.string,
  warningContent: PropTypes.instanceOf(RoomViewWarningContentComponent),
  warningTitle: PropTypes.string,
};

RoomViewForm.defaultProps = {
  roomView: null,
  submitText: 'Submit',
  error: null,
  onCancel: null,
  onAccept: null,
  type: 'default',
  warningContent: null,
  warningTitle: null,
};

export default RoomViewForm;
