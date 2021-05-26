import React, { useState } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { Container, Typography, Grid, Button, Link } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import MyTextField from '../../Common/MyTextField';
import axiosInstance from '../../Common/API';
import useStyles from '../../Common/Styles';

const validationSchema = Yup.object({
  email: Yup.string().email('Invalid email adress').required('Required'),

  password: Yup.string()
    .min(8, 'Must be 8 characters or more')
    .required('Required'),
});

const SignIn = ({ onSignIn }) => {
  const classes = useStyles();
  const [error, setError] = useState('');
  const history = useHistory();

  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <div className={classes.form}>
          <Formik
            initialValues={{
              email: '',
              password: '',
            }}
            validationSchema={validationSchema}
            onSubmit={async (values) => {
              setError('');

              const request = {
                Email: values.email,
                Password: values.password,
              };

              await axiosInstance
                .post('/Account/SignIn', request)
                .then((response) => {
                  onSignIn(response);
                  history.push('/Hotels');
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
            }}
          >
            <Form autoComplete="on">
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
                    label="Password"
                    name="password"
                    type="password"
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
                  Sign In
                </Button>

                <Grid container justify="flex-end">
                  <Grid item>
                    <Link href="/SignUp" variant="body2">
                      Don't have an account? Sign up
                    </Link>
                  </Grid>
                </Grid>
              </Grid>
            </Form>
          </Formik>
        </div>
      </div>
    </Container>
  );
};

SignIn.propTypes = {
  onSignIn: PropTypes.func.isRequired,
};

export default SignIn;
