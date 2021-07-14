import { makeStyles, Snackbar } from '@material-ui/core';
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Alert } from '@material-ui/lab';
import HotelsTable from '../HotelsTableModule/HotelsTable/HotelsTable';
import RoomViewTable from '../RoomViewTableModule/RoomViewTable/RoomViewTable';
import Hotel from '../../Models/Hotel';
import User from '../../Models/User';
import FullScreenDialog from '../../Common/FullScreenDialog';
import RoomView from '../../Models/RoomView';
import Constants from '../../Common/Constants';

const useStyles = makeStyles((theme) => ({
  content: {
    margin: theme.spacing(3, 7),
  },
  contentItem: {
    margin: theme.spacing(0, 0, 3, 0),
  },
}));

const HotelsManagementComponent = ({
  users,
  isOpen,
  close,
  role,
  hotels,
  roomViews,
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
  createRoomImage,
  deleteRoomImage,
  createRoomView,
  updateRoomView,
  deleteRoomView,
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
    <FullScreenDialog
      isOpen={isOpen}
      close={close}
      title="Hotels management"
      contentComponent={
        <>
          <div className={classes.content}>
            <div className={classes.contentItem}>
              <HotelsTable
                role={role}
                users={users}
                hotels={hotels}
                roomViews={roomViews}
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
                createRoomImage={createRoomImage}
                deleteRoomImage={deleteRoomImage}
                onError={handleError}
                onSuccess={handleSuccess}
              />
            </div>
            {role && role === Constants.adminRole ? (
              <div className={classes.contentItem}>
                <RoomViewTable
                  role={role}
                  roomViews={roomViews}
                  createRoomView={createRoomView}
                  updateRoomView={updateRoomView}
                  deleteRoomView={deleteRoomView}
                  onError={handleError}
                  onSuccess={handleSuccess}
                />
              </div>
            ) : null}
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
            <Alert
              onClose={handleResetSuccess}
              severity="success"
              variant="filled"
            >
              {success}
            </Alert>
          </Snackbar>
        </>
      }
    />
  );
};

HotelsManagementComponent.propTypes = {
  users: PropTypes.arrayOf(User).isRequired,
  isOpen: PropTypes.bool.isRequired,
  role: PropTypes.string.isRequired,
  close: PropTypes.func.isRequired,
  hotels: PropTypes.arrayOf(Hotel).isRequired,
  roomViews: PropTypes.arrayOf(RoomView),
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
  createRoomImage: PropTypes.func.isRequired,
  deleteRoomImage: PropTypes.func.isRequired,
  createRoomView: PropTypes.func.isRequired,
  updateRoomView: PropTypes.func.isRequired,
  deleteRoomView: PropTypes.func.isRequired,
};

HotelsManagementComponent.defaultProps = {
  roomViews: [],
};

export default HotelsManagementComponent;
