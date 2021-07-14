import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { CircularProgress, Snackbar } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import ProfileComponent from './ProfileComponent';
import User from '../../Models/User';
import API from '../../Common/API';
import ManagementService from '../../Common/ManagementService';

const parseJwt = (token) => {
  try {
    return JSON.parse(atob(token.split('.')[1]));
  } catch {
    return null;
  }
};

const getUserIdFromStorage = () => {
  const jwt = localStorage.getItem('access_token');
  // eslint-disable-next-line no-debugger
  debugger;
  if (jwt) {
    const userDecoded = parseJwt(jwt);
    const userId = userDecoded.id;
    return userId;
  }

  return null;
};

const requestUserAsync = async (userId) => {
  const userResponded = await API.getUser(userId);
  const user = new User(userResponded);

  return user;
};

const Profile = ({ loggedUserId }) => {
  const [loggedUser, setLoggedUser] = useState(null);
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

  const handleUpdateUser = async (user) => {
    // eslint-disable-next-line no-debugger
    debugger;
    const [userResponded, errorResponded] =
      await ManagementService.baseRequestHandler(
        ManagementService.handleUpdateUser,
        user
      );

    if (errorResponded) {
      handleError(errorResponded);
    } else {
      handleSuccess(`User ${userResponded.email} updated successfully`);
      setLoggedUser(new User(userResponded));
    }

    return [userResponded, errorResponded];
  };

  useEffect(async () => {
    if (!loggedUserId) {
      const userId = getUserIdFromStorage();

      if (userId) {
        const user = await requestUserAsync(userId);
        setLoggedUser(user);
      }
    } else {
      const user = await requestUserAsync(loggedUserId);
      setLoggedUser(user);
    }
  }, []);

  return loggedUser ? (
    <>
      <ProfileComponent loggedUser={loggedUser} updateUser={handleUpdateUser} />
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
    </>
  ) : (
    <CircularProgress />
  );
};

Profile.propTypes = {
  loggedUserId: PropTypes.string,
};

Profile.defaultProps = {
  loggedUserId: null,
};

export default Profile;
