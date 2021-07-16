import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Snackbar, makeStyles } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import FullScreenDialog from '../../Common/FullScreenDialog';
import UsersTable from '../UsersTableModule/UsersTable/UsersTable';
import User from '../../Models/User';
import HotelBrief from '../../Models/HotelBrief';
import UserBrief from '../../Models/UserBrief';

const useStyles = makeStyles((theme) => ({
  content: {
    margin: theme.spacing(3, 7),
  },
  contentItem: {
    margin: theme.spacing(0, 0, 3, 0),
  },
}));

const UsersManagementComponent = ({
  isOpen,
  hotels,
  close,
  users,
  usersBrief,
  onChangeSearchClauses,
  createUser,
  updateUser,
  deleteUser,
  totalCount,
  pageChanged,
  pageSizeChanged,
  pageSize,
}) => {
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const classes = useStyles();

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

  const usersManagementDialogTitle = 'Users management';
  return (
    <FullScreenDialog
      isOpen={isOpen}
      close={close}
      title={usersManagementDialogTitle}
      contentComponent={
        <div className={classes.content}>
          <div className={classes.contentItem}>
            <UsersTable
              users={users}
              usersBrief={usersBrief}
              onChangeSearchClauses={onChangeSearchClauses}
              hotels={hotels}
              createUser={createUser}
              updateUser={updateUser}
              deleteUser={deleteUser}
              onError={handleError}
              onSuccess={handleSuccess}
              totalCount={totalCount}
              pageChanged={pageChanged}
              pageSizeChanged={pageSizeChanged}
              pageSize={pageSize}
            />
            <Snackbar
              open={!!error}
              autoHideDuration={5000}
              onClose={handleResetError}
            >
              <Alert
                onClose={handleResetError}
                severity="error"
                variant="filled"
              >
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
          </div>
        </div>
      }
    />
  );
};

UsersManagementComponent.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  close: PropTypes.func.isRequired,
  users: PropTypes.arrayOf(User),
  usersBrief: PropTypes.arrayOf(UserBrief).isRequired,
  onChangeSearchClauses: PropTypes.func.isRequired,
  hotels: PropTypes.arrayOf(HotelBrief),
  createUser: PropTypes.func.isRequired,
  updateUser: PropTypes.func.isRequired,
  deleteUser: PropTypes.func.isRequired,
  totalCount: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  pageChanged: PropTypes.func.isRequired,
  pageSizeChanged: PropTypes.func.isRequired,
};

UsersManagementComponent.defaultProps = {
  users: [],
  hotels: [],
};

export default UsersManagementComponent;
