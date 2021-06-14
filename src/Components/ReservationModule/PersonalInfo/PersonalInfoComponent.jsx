import React from 'react';
import PropTypes from 'prop-types';
import { Form, Formik } from 'formik';
import { Button, Grid } from '@material-ui/core';
import MyTextField from '../../../Common/MyTextField';

const PersonalInfoComponent = ({
  onSetCustomer,
  initialValues,
  validationSchema,
}) => {
  return (
    <Formik
      onSubmit={onSetCustomer}
      initialValues={initialValues}
      validationSchema={validationSchema}
    >
      <Form>
        <Grid container spacing={1}>
          <Grid item xs={12} md={6}>
            <MyTextField
              fullWidth
              variant="outlined"
              size="small"
              label="Surname"
              name="firstName"
              type="text"
              placeholder="Surname"
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <MyTextField
              fullWidth
              variant="outlined"
              size="small"
              label="Name"
              name="lastName"
              type="text"
              placeholder="Name"
            />
          </Grid>

          <Grid item xs={12}>
            <MyTextField
              fullWidth
              variant="outlined"
              size="small"
              label="Email"
              name="email"
              type="email"
              placeholder="example@mail.com"
            />
          </Grid>
          <Grid item xs={12}>
            <MyTextField
              fullWidth
              variant="outlined"
              size="small"
              label="Email confirmation"
              name="confirmEmail"
              type="email"
              placeholder="example@mail.com"
            />
          </Grid>
          <Grid item xs={12}>
            <Button fullWidth variant="contained" type="submit" color="primary">
              Submit
            </Button>
          </Grid>
        </Grid>
      </Form>
    </Formik>
  );
};

PersonalInfoComponent.propTypes = {
  onSetCustomer: PropTypes.func.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  initialValues: PropTypes.object.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  validationSchema: PropTypes.object.isRequired,
};

export default PersonalInfoComponent;
