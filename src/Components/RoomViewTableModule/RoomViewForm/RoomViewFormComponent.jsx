import React from 'react';
import PropTypes from 'prop-types';
import { Button, IconButton, Typography } from '@material-ui/core';
import { Formik, Form } from 'formik';
import { Alert } from '@material-ui/lab';
import CloseIcon from '@material-ui/icons/Close';
import MyTextField from '../../../Common/MyTextField';
import RoomView from '../../../Models/RoomView';
import WarningDialog from '../../../Common/WarningDialog';

const RoomViewFormComponent = ({
  roomView,
  validationSchema,
  submitHandler,
  submitText,
  error,
  resetError,
  onCancel,
  onAccept,
  openWarning,
  onOpenWarning,
  onCloseWarning,
}) => {
  return (
    <>
      <Formik
        initialValues={{
          name: roomView ? roomView.name : '',
        }}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          onOpenWarning();
          submitHandler(values);
        }}
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
      {openWarning ? (
        <WarningDialog
          open={openWarning}
          close={onCloseWarning}
          onAccept={onAccept}
          onCancel={onCancel}
          cancelText="Cancel"
          acceptText="Create view"
        >
          <Typography>
            Room view "{roomView?.name}" is going to be created. Accept or
            decline the creating
          </Typography>
        </WarningDialog>
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
  onCancel: PropTypes.func,
  onAccept: PropTypes.func,
  openWarning: PropTypes.bool.isRequired,
  onOpenWarning: PropTypes.func.isRequired,
  onCloseWarning: PropTypes.func.isRequired,
};

RoomViewFormComponent.defaultProps = {
  roomView: null,
  error: null,
  onCancel: null,
  onAccept: null,
};

export default RoomViewFormComponent;
