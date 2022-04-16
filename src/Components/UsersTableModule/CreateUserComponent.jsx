import React, { useState } from 'react';
import PropTypes from 'prop-types';
import * as Yup from 'yup';
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
import MyTextField from '../../Common/MyTextField';
import Constants from '../../Common/Constants';
import HotelBrief from '../../Models/HotelBrief';

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

  password: Yup.string()
    .min(8, 'Must be 8 characters or more')
    .required('Required'),

  passwordConfirm: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Required'),

  dateOfBirth: Yup.date().required('Required'),
});

const CreateUserComponent = ({
  open,
  close,
  onSuccess,
  createUser,
  hotels,
}) => {
  const [error, setError] = useState(null);
  const [selectedRoles, setSelectedRoles] = useState(['User']);
  const [selectedHotels, setSelectedHotels] = useState([]);

  const roles = ['User', 'Manager', 'Admin']; // create request for roles

  const dialogTitle = 'User creation';
  const classes = useStyles();

  const onCreateUser = async (values) => {
    const creatingUser = {
      userName: values.userName,
      email: values.email,
      password: values.password,
      passwordConfirm: values.passwordConfirm,
      phoneNumber: values.phoneNumber,
      dateOfBirth: values.dateOfBirth,
      firstName: values.firstName,
      lastName: values.lastName,
      roles: values.roles,
      hotels: values.hotels,
    };

    const [user, errorResponse] = await createUser(creatingUser);

    if (errorResponse) {
      setError(errorResponse);
    } else {
      onSuccess(`User ${user.email} created successfully`);
      close();
      setSelectedRoles(['User']);
      setSelectedHotels([]);
    }
  };

  const handleResetError = () => {
    setError(null);
  };

  return (
    <BaseDialog title={dialogTitle} open={open} close={close}>
      <div className={classes.paper}>
        <div className={classes.form}>
          <Formik
            initialValues={{
              userName: '',
              email: '',
              firstName: '',
              lastName: '',
              phoneNumber: '',
              password: '',
              passwordConfirm: '',
              dateOfBirth: '',
            }}
            validationSchema={validationSchema}
            onSubmit={(values) => {
              // eslint-disable-next-line no-param-reassign
              values.roles = selectedRoles;
              // eslint-disable-next-line no-param-reassign
              values.hotels = selectedHotels.map((hotel) => hotel.id);
              onCreateUser(values);
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

                <Grid item xs={12} sm={6}>
                  <MyTextField
                    required
                    fullWidth
                    label="Password"
                    name="password"
                    type="password"
                    placeholder="Password"
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <MyTextField
                    required
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
                  Create user
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
    </BaseDialog>
  );
};

CreateUserComponent.propTypes = {
  open: PropTypes.bool.isRequired,
  close: PropTypes.func.isRequired,
  createUser: PropTypes.func.isRequired,
  onSuccess: PropTypes.func.isRequired,
  hotels: PropTypes.arrayOf(HotelBrief),
};

CreateUserComponent.defaultProps = {
  hotels: [],
};

export default CreateUserComponent;
