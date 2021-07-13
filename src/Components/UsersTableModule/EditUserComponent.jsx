import React, { useState } from 'react';
import * as Yup from 'yup';
import PropTypes from 'prop-types';
import { CloseOutlined } from '@material-ui/icons';
import {
  Button,
  Grid,
  IconButton,
  TextField,
  makeStyles,
} from '@material-ui/core';
import { Formik, Form } from 'formik';
import { Alert, Autocomplete } from '@material-ui/lab';
import BaseDialog from '../../Common/BaseDialog';
import User from '../../Models/User';
import MyTextField from '../../Common/MyTextField';
import Constants from '../../Common/Constants';
import HotelBrief from '../../Models/HotelBrief';

const toISODate = (date) => {
  return `${date.getFullYear()}-${`0${date.getMonth() + 1}`.slice(
    -2
  )}-${`0${date.getDate()}`.slice(-2)}`;
};

const useStyles = makeStyles((theme) => ({
  paper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  form: {
    width: '100%',
  },
  submit: {
    margin: theme.spacing(5, 0, 2),
    background: 'linear-gradient(45deg, #1A2980 0%, #26D0CE 51%, #1A2980 100%)',
    border: 0,
    borderRadius: '15px',
    color: 'white',
    height: 40,
    padding: '15px 45px',
    textAlign: 'center',
    textTransform: 'uppercase',
  },
}));

const validationSchema = Yup.object({
  userName: Yup.string()
    .max(20, 'Must be 20 characters or less')
    .required('Required'),

  email: Yup.string().email('Invalid email adress').required('Required'),

  firstName: Yup.string()
    .max(20, 'Must be 20 characters or less')
    .required('Required'),

  lastName: Yup.string()
    .max(20, 'Must be 20 characters or less')
    .required('Required'),

  phoneNumber: Yup.string()
    .matches(
      /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/im,
      'Invalid phone number'
    )
    .required('Required'),

  oldPassword: Yup.string().when('newPassword', (newPassword) => {
    if (newPassword) {
      return Yup.string()
        .min(8, 'Must be 8 characters or more')
        .required('Requied to change password');
    }

    return Yup.string().min(8, 'Must be 8 characters or more');
  }),

  newPassword: Yup.string().min(8, 'Must be 8 characters or more'),

  passwordConfirm: Yup.string().when('newPassword', (newPassword) => {
    if (newPassword) {
      return Yup.string()
        .min(8, 'Must be 8 characters or more')
        .oneOf([Yup.ref('newPassword'), null], 'Passwords must match')
        .required('Required');
    }

    return Yup.string().min(8, 'Must be 8 characters or more');
  }),

  dateOfBirth: Yup.date().required('Required'),
});

const EditUserComponent = ({
  open,
  close,
  user,
  hotels,
  updateUser,
  onSuccess,
}) => {
  const [error, setError] = useState(null);
  const [selectedRoles, setSelectedRoles] = useState(
    user?.roles ? user.roles : ['User']
  );
  const [selectedHotels, setSelectedHotels] = useState(
    user?.hotels
      ? user.hotels.map((hotelId) =>
          hotels.find((hotel) => hotel.id === hotelId)
        )
      : []
  );

  const roles = ['User', 'Manager', 'Admin']; // create request for roles

  const dialogTitle = `Updating ${user.email} user`;
  const classes = useStyles();

  const onUpdateUser = async (values) => {
    const updatingUser = {
      id: user.id,
      userName: values.userName,
      email: values.email,
      oldPassword: values.oldPassword,
      newPassword: values.newPassword,
      passwordConfirm: values.passwordConfirm,
      phoneNumber: values.phoneNumber,
      dateOfBirth: values.dateOfBirth,
      firstName: values.firstName,
      lastName: values.lastName,
      roles: values.roles,
      hotels: values.hotels,
    };

    const [updatedUser, errorResponse] = await updateUser(updatingUser);

    if (errorResponse) {
      setError(errorResponse);
    } else {
      onSuccess(`User ${updatedUser.email} created successfully`);
      close();
    }
  };

  // const handleResetRolesSelection = () => {
  //   setSelectedRoles(['User']);
  // };

  const handleResetError = () => {
    setError(null);
  };

  return (
    <BaseDialog
      title={dialogTitle}
      open={open}
      close={close}
      contentComponent={
        <div className={classes.paper}>
          <div className={classes.form}>
            <Formik
              initialValues={{
                userName: user?.userName ? user.userName : '',
                email: user?.email ? user.email : '',
                firstName: user?.firstName ? user.firstName : '',
                lastName: user?.lastName ? user.lastName : '',
                phoneNumber: user?.phoneNumber ? user.phoneNumber : '',
                oldPassword: '',
                newPassword: '',
                passwordConfirm: '',
                dateOfBirth: user?.dateOfBirth
                  ? toISODate(user.dateOfBirth)
                  : '',
              }}
              validationSchema={validationSchema}
              onSubmit={(values) => {
                // eslint-disable-next-line no-param-reassign
                values.roles = selectedRoles;
                // eslint-disable-next-line no-param-reassign
                values.hotels = selectedHotels.map((hotel) => hotel.id);
                onUpdateUser(values);
              }}
            >
              <Form>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <MyTextField
                      required
                      fullWidth
                      label="Email"
                      name="email"
                      type="email"
                      placeholder="email@email.com"
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <MyTextField
                      required
                      fullWidth
                      label="User Name"
                      name="userName"
                      type="text"
                      placeholder="nickname"
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <MyTextField
                      required
                      fullWidth
                      label="First Name"
                      name="firstName"
                      type="text"
                      placeholder="Surname"
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <MyTextField
                      required
                      fullWidth
                      label="Last Name"
                      name="lastName"
                      type="text"
                      placeholder="Name"
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <MyTextField
                      required
                      fullWidth
                      label="Phone"
                      name="phoneNumber"
                      type="text"
                      placeholder="+375101234567"
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <MyTextField
                      fullWidth
                      label="Old password"
                      name="oldPassword"
                      type="password"
                      placeholder="Password"
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <MyTextField
                      fullWidth
                      label="New password"
                      name="newPassword"
                      type="password"
                      placeholder="Password"
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <MyTextField
                      fullWidth
                      label="Password Confirm"
                      name="passwordConfirm"
                      type="password"
                      placeholder="Password"
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <MyTextField
                      required
                      fullWidth
                      label="Date of Birth"
                      name="dateOfBirth"
                      type="date"
                      InputLabelProps={{ shrink: true }}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <Autocomplete
                      multiple
                      limitTags={3}
                      value={selectedRoles}
                      size="small"
                      options={roles}
                      getOptionLabel={(role) => `${role}`}
                      onChange={(event, newValues) => {
                        setSelectedRoles(newValues);
                      }}
                      renderInput={(params) => (
                        <TextField {...params} variant="outlined" />
                      )}
                    />
                  </Grid>

                  {selectedRoles.includes(Constants.managerRole) ||
                  selectedRoles.includes(Constants.adminRole) ? (
                    <Grid item xs={12}>
                      <Autocomplete
                        multiple
                        limitTags={3}
                        value={selectedHotels}
                        size="small"
                        options={hotels}
                        getOptionLabel={(hotel) =>
                          `${hotel.name} (${hotel.location.buildingNumber} ${hotel.location.street} St., ${hotel.location.city}, ${hotel.location.region}, ${hotel.location.country})`
                        }
                        onChange={(event, newValues) => {
                          setSelectedHotels(newValues);
                        }}
                        renderInput={(params) => (
                          <TextField {...params} variant="outlined" />
                        )}
                      />
                    </Grid>
                  ) : null}

                  <Button
                    fullWidth
                    className={classes.submit}
                    variant="contained"
                    type="submit"
                    color="primary"
                  >
                    Update user
                  </Button>
                </Grid>
              </Form>
            </Formik>
          </div>
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
                    handleResetError();
                  }}
                >
                  <CloseOutlined fontSize="inherit" />
                </IconButton>
              }
            >
              {error}
            </Alert>
          ) : null}
        </div>
      }
    />
  );
};

EditUserComponent.propTypes = {
  user: PropTypes.instanceOf(User).isRequired,
  hotels: PropTypes.arrayOf(HotelBrief),
  open: PropTypes.bool.isRequired,
  close: PropTypes.func.isRequired,
  updateUser: PropTypes.func.isRequired,
  onSuccess: PropTypes.func.isRequired,
};

EditUserComponent.defaultProps = {
  hotels: [],
};

export default EditUserComponent;
