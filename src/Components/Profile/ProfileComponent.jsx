import React from 'react';
import PropTypes from 'prop-types';
import { Avatar, Grid, Typography, makeStyles } from '@material-ui/core';
import User from '../../Models/User';
import ProfileField from './ProfileField';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(1, 5, 1),
    [theme.breakpoints.up('md')]: {
      padding: theme.spacing(1, 30, 1),
    },
    [theme.breakpoints.up('lg')]: {
      padding: theme.spacing(1, 50, 1),
    },
    [theme.breakpoints.up('xl')]: {
      padding: theme.spacing(1, 70, 1),
    },
  },
  avatar: {
    width: theme.spacing(15),
    height: theme.spacing(15),
    fontSize: '50px',
  },
}));

const ProfileComponent = ({ loggedUser, updateUser }) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid container item xs={12} alignItems="center">
          <Grid item xs={9}>
            <Typography variant="h4">Personal details</Typography>
            <Typography variant="body1">
              Your account inforamtion details and management
            </Typography>
          </Grid>
          <Grid item xs={3}>
            <Avatar className={classes.avatar}>
              {loggedUser.firstName[0] + loggedUser.lastName[0]}
            </Avatar>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          {/* {Object.entries(loggedUser).map(([key, value]) =>
            value ? <ProfileField fieldTitle={key} /> : null
          )} */}
          <ProfileField
            fieldTitle="Email"
            fieldValue={loggedUser.email}
            update={(newEmail) => {
              const updatingUser = { ...loggedUser };
              updatingUser.email = newEmail;
              updateUser(updatingUser);
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <ProfileField
            fieldTitle="Surname"
            fieldValue={loggedUser.firstName}
            update={(newSurname) => {
              const updatingUser = { ...loggedUser };
              updatingUser.firstName = newSurname;
              updateUser(updatingUser);
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <ProfileField
            fieldTitle="Name"
            fieldValue={loggedUser.lastName}
            update={(newName) => {
              const updatingUser = { ...loggedUser };
              updatingUser.lastName = newName;
              updateUser(updatingUser);
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <ProfileField
            fieldTitle="Nickname"
            fieldValue={loggedUser.userName}
            update={(newNickname) => {
              const updatingUser = { ...loggedUser };
              updatingUser.userName = newNickname;
              updateUser(updatingUser);
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <ProfileField
            fieldTitle="Phone"
            fieldValue={loggedUser.phoneNumber}
            update={(newPhone) => {
              const updatingUser = { ...loggedUser };
              updatingUser.phoneNumber = newPhone;
              updateUser(updatingUser);
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <ProfileField
            isDate
            fieldTitle="Date of birth"
            fieldValue={loggedUser.dateOfBirth}
            update={(newDate) => {
              const updatingUser = { ...loggedUser };
              updatingUser.dateOfBirth = new Date(newDate);
              updateUser(updatingUser);
            }}
          />
        </Grid>
      </Grid>
    </div>
  );
};

ProfileComponent.propTypes = {
  loggedUser: PropTypes.instanceOf(User).isRequired,
  updateUser: PropTypes.func.isRequired,
};

export default ProfileComponent;
