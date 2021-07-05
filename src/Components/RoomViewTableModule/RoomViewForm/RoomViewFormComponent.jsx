import React from 'react';
import PropTypes from 'prop-types';
import { Button, IconButton } from '@material-ui/core';
import { Formik, Form } from 'formik';
import { Alert } from '@material-ui/lab';
import CloseIcon from '@material-ui/icons/Close';
import MyTextField from '../../../Common/MyTextField';
import RoomView from '../../../Models/RoomView';

const RoomViewFormComponent = ({
  roomView,
  validationSchema,
  submitHandler,
  submitText,
  error,
  resetError,
}) => {
  return (
    <>
      <Formik
        initialValues={{
          name: roomView ? roomView.name : '',
        }}
        validationSchema={validationSchema}
        onSubmit={submitHandler}
      >
        <Form autoComplete="on">
          <MyTextField
            required
            fullWidth
            label="Name"
            name="name"
            type="text"
          />
          <Button fullWidth variant="contained" type="submit" color="primary">
            {submitText}
          </Button>
        </Form>
      </Formik>
      {error != null ? (
        <Alert
          fullWidth
          variant="outlined"
          severity="error"
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                resetError();
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
        >
          {error}
        </Alert>
      ) : null}
    </>
  );
};

RoomViewFormComponent.propTypes = {
  roomView: PropTypes.instanceOf(RoomView),
  // eslint-disable-next-line react/forbid-prop-types
  validationSchema: PropTypes.object.isRequired,
  submitHandler: PropTypes.func.isRequired,
  submitText: PropTypes.string.isRequired,
  error: PropTypes.string,
  resetError: PropTypes.func.isRequired,
};

RoomViewFormComponent.defaultProps = {
  roomView: null,
  error: null,
};

export default RoomViewFormComponent;
