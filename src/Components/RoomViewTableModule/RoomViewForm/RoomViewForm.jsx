import React from 'react';
import * as Yup from 'yup';
import PropTypes from 'prop-types';
import RoomViewFormComponent from './RoomViewFormComponent';
import RoomView from '../../../Models/RoomView';

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
}) => {
  return (
    <RoomViewFormComponent
      roomView={roomView}
      validationSchema={validationSchema}
      submitHandler={submitHandler}
      submitText={submitText}
      error={error}
      resetError={resetError}
    />
  );
};

RoomViewForm.propTypes = {
  roomView: PropTypes.instanceOf(RoomView),
  submitHandler: PropTypes.func.isRequired,
  submitText: PropTypes.string,
  error: PropTypes.string,
  resetError: PropTypes.func.isRequired,
};

RoomViewForm.defaultProps = {
  roomView: null,
  submitText: 'Submit',
  error: null,
};

export default RoomViewForm;
