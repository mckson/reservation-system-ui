import React from 'react';
import { CloseOutlined } from '@material-ui/icons';
import {
  IconButton,
  Dialog,
  DialogTitle,
  Typography,
  makeStyles,
  DialogContent,
  Button,
} from '@material-ui/core';
import PropTypes from 'prop-types';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import { Alert } from '@material-ui/lab';
import CloseIcon from '@material-ui/icons/Close';
import Room from '../../Models/Hotel';
import MyTextField from '../../Common/MyTextField';

const useStyles = makeStyles(() => ({
  titleSection: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    flexGrow: 1,
  },
  closeButton: {
    width: 'auto',
  },
}));

const validationSchema = Yup.object({
  number: Yup.number()
    .max(10000, 'Must be 10000 or less')
    .min(1, 'Must be 1 or more')
    .required('Required'),
  floor: Yup.number()
    .max(500, 'Must be 500 or less')
    .min(1, 'Must be 1 or more')
    .required('Required'),
  price: Yup.number().min(1, 'Must be 1 or more').required('Required'),
  capacity: Yup.number()
    .max(50, 'Must be 10 or less')
    .min(1, 'Must be 1 or more')
    .required('Required'),
});

const RoomForm = ({
  open,
  close,
  room,
  submitHandler,
  title,
  submitText,
  error,
  resetError,
}) => {
  const classes = useStyles();

  return (
    <div>
      <Dialog open={open}>
        <DialogTitle>
          <div className={classes.titleSection}>
            <Typography className={classes.title} variant="h6">
              {title}
            </Typography>
            <IconButton className={classes.closeButton} onClick={close}>
              <CloseOutlined />
            </IconButton>
          </div>
        </DialogTitle>
        <DialogContent>
          <Formik
            initialValues={{
              number: room != null ? room.roomNumber : '',
              floor: room != null ? room.floorNumber : '',
              price: room != null ? room.price : '',
              capacity: room != null ? room.capacity : '',
            }}
            validationSchema={validationSchema}
            onSubmit={submitHandler}
          >
            <Form autoComplete="on">
              <MyTextField
                required
                fullWidth
                label="Number"
                name="number"
                type="text"
                placeholder="4"
              />
              <MyTextField
                required
                fullWidth
                label="Floor number"
                name="floor"
                type="text"
                placeholder="1"
              />
              <MyTextField
                required
                fullWidth
                label="Price per night"
                name="price"
                type="text"
                placeholder="100"
              />
              <MyTextField
                required
                fullWidth
                label="Beds"
                name="capacity"
                type="text"
                placeholder="2"
              />
              <Button
                fullWidth
                className={classes.submit}
                variant="contained"
                type="submit"
                color="primary"
              >
                {submitText}
              </Button>
            </Form>
          </Formik>
        </DialogContent>
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
      </Dialog>
    </div>
  );
};

RoomForm.propTypes = {
  open: PropTypes.bool.isRequired,
  close: PropTypes.func.isRequired,
  room: PropTypes.instanceOf(Room).isRequired,
  submitHandler: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  submitText: PropTypes.string,
  error: PropTypes.string,
  resetError: PropTypes.func.isRequired,
};

RoomForm.defaultProps = {
  submitText: 'Submit',
  error: null,
};

export default RoomForm;
