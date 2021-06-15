import {
  Dialog,
  IconButton,
  makeStyles,
  Slide,
  Toolbar,
  Typography,
  Snackbar,
} from '@material-ui/core';
import React, { forwardRef, useState } from 'react';
import CloseIcon from '@material-ui/icons/Close';
import PropTypes from 'prop-types';
import { Alert } from '@material-ui/lab';
import HotelsTable from '../HotelsTableModule/HotelsTable/HotelsTable';
import Hotel from '../../Models/Hotel';
import User from '../../Models/User';

const useStyles = makeStyles((theme) => ({
  dialogbar: {
    display: 'flex',
    justifyContent: 'space-between',
    background: theme.palette.primary.main,
    color: theme.palette.background.paper,
  },
  content: {
    margin: theme.spacing(3, 7),
  },
}));

const Transition = forwardRef(function Transistion(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const HotelsManagementComponent = ({
  users,
  isOpen,
  close,
  role,
  hotels,
  totalCount,
  pageChanged,
  pageSizeChanged,
  pageSize,
  deleteHotel,
  updateHotel,
  createHotel,
  createRoom,
  updateRoom,
  deleteRoom,
  createService,
  updateService,
  deleteService,
  updateUser,
  createImage,
  deleteImage,
}) => {
  const classes = useStyles();
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleResetError = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setError(null);
  };

  const handleResetSuccess = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setSuccess(null);
  };

  const handleError = (errorMessage) => {
    setError(errorMessage);
  };

  const handleSuccess = (successMessage) => {
    setSuccess(successMessage);
  };

  return (
    <Dialog
      fullScreen
      fullWidth
      open={isOpen}
      onClose={close}
      TransitionComponent={Transition}
    >
      <Toolbar className={classes.dialogbar}>
        <Typography variant="h6">Hotels management</Typography>
        <IconButton edge="end" color="inherit" onClick={close}>
          <CloseIcon />
        </IconButton>
      </Toolbar>
      <div className={classes.content}>
        <HotelsTable
          role={role}
          users={users}
          hotels={hotels}
          totalCount={totalCount}
          pageChanged={pageChanged}
          pageSize={pageSize}
          pageSizeChanged={pageSizeChanged}
          deleteHotel={deleteHotel}
          updateHotel={updateHotel}
          createHotel={createHotel}
          createRoom={createRoom}
          updateRoom={updateRoom}
          deleteRoom={deleteRoom}
          createService={createService}
          updateService={updateService}
          deleteService={deleteService}
          updateUser={updateUser}
          createImage={createImage}
          deleteImage={deleteImage}
          onError={handleError}
          onSuccess={handleSuccess}
        />
      </div>
      <Snackbar
        open={!!error}
        autoHideDuration={5000}
        onClose={handleResetError}
      >
        <Alert onClose={handleResetError} severity="error" variant="filled">
          {error}
        </Alert>
      </Snackbar>
      <Snackbar
        open={!!success}
        autoHideDuration={5000}
        onClose={handleResetSuccess}
      >
        <Alert onClose={handleResetSuccess} severity="success" variant="filled">
          {success}
        </Alert>
      </Snackbar>
    </Dialog>
  );
};

HotelsManagementComponent.propTypes = {
  users: PropTypes.arrayOf(User).isRequired,
  isOpen: PropTypes.bool.isRequired,
  role: PropTypes.string.isRequired,
  close: PropTypes.func.isRequired,
  hotels: PropTypes.arrayOf(Hotel).isRequired,
  totalCount: PropTypes.number.isRequired,
  pageChanged: PropTypes.func.isRequired,
  pageSizeChanged: PropTypes.func.isRequired,
  pageSize: PropTypes.number.isRequired,
  deleteHotel: PropTypes.func.isRequired,
  updateHotel: PropTypes.func.isRequired,
  createHotel: PropTypes.func.isRequired,
  createRoom: PropTypes.func.isRequired,
  updateRoom: PropTypes.func.isRequired,
  deleteRoom: PropTypes.func.isRequired,
  createService: PropTypes.func.isRequired,
  updateService: PropTypes.func.isRequired,
  deleteService: PropTypes.func.isRequired,
  updateUser: PropTypes.func.isRequired,
  createImage: PropTypes.func.isRequired,
  deleteImage: PropTypes.func.isRequired,
};

export default HotelsManagementComponent;
