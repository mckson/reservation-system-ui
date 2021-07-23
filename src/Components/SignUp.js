import React, { useState } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import {
  Button,
  Container,
  CssBaseline,
  Typography,
  Grid,
  Link,
} from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import MyTextField from '../Common/MyTextField';
import API from '../api/API';
import useStyles from '../Common/Styles';

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

const SignUp = ({ onSignUp }) => {
  const url = '/Account/SignUp';
  const classes = useStyles();
  const [error, setError] = useState('');
  const history = useHistory();

  const onSubmit = async (values) => {
    setError('');

    const request = {
      Email: values.email,
      FirstName: values.firstName,
      LastName: values.lastName,
      UserName: values.userName,
      PhoneNumber: values.phoneNumber,
      Password: values.password,
      PasswordConfirm: values.passwordConfirm,
      DateOfBirth: values.dateOfBirth,
    };

    await API.axios
      .post(url, request)
      .then((response) => {
        onSignUp(response);
        history.push('/');
      })
      .catch((err) => {
        if (err.response) {
          /*
           * The request was made and the server responded with a
           * status code that falls out of the range of 2xx
           */
          console.log(err.response.data);
          console.log(err.response.status);
          console.log(err.response.headers);
          setError(err.response.data.message);
        } else if (err.request) {
          /*
           * The request was made but no response was received, `error.request`
           * is an instance of XMLHttpRequest in the browser and an instance
           * of http.ClientRequest in Node.js
           */
          console.log(err.request);
        } else {
          // Something happened in setting up the request and triggered an Error
          console.log('Error', err.message);
        }
        console.log(err.config);
      });
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline>
        <div className={classes.paper}>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
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
              onSubmit={onSubmit}
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
                    {error !== '' ? (
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
                              setError('');
                            }}
                          >
                            <CloseIcon fontSize="inherit" />
                          </IconButton>
                        }
                      >
                        {error}
                      </Alert>
                    ) : null}
                  </Grid>

                  <Button
                    fullWidth
                    className={classes.submit}
                    variant="contained"
                    type="submit"
                    color="primary"
                  >
                    Sign Up
                  </Button>

                  <Grid container justify="flex-end">
                    <Grid item>
                      <Link href="/SignIn" variant="body2">
                        Already have an account? Sign in
                      </Link>
                    </Grid>
                  </Grid>
                </Grid>
              </Form>
            </Formik>
          </div>
        </div>
      </CssBaseline>
    </Container>
  );
};

SignUp.propTypes = {
  onSignUp: PropTypes.func.isRequired,
};

export default SignUp;
