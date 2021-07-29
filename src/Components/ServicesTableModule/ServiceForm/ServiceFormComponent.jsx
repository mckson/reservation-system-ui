import { Button, IconButton } from '@material-ui/core';
import React from 'react';
import PropTypes from 'prop-types';
import { Form, Formik } from 'formik';
import { Alert } from '@material-ui/lab';
import CloseIcon from '@material-ui/icons/Close';
import MyTextField from '../../../Common/MyTextField';
import Service from '../../../Models/Service';
import BaseDialog from '../../../Common/BaseDialog';

const ServiceFormComponent = ({
  open,
  title,
  close,
  service,
  validationSchema,
  submitHandler,
  submitText,
  error,
  resetError,
}) => {
  return (
    <div>
      <BaseDialog open={open} close={close} title={title}>
        <Formik
          initialValues={{
            name: service != null ? service.name : '',
            price: service != null ? service.price : '',
          }}
          validationSchema={validationSchema}
          onSubmit={submitHandler}
        >
          <Form autoComplete="on">
            <MyTextField
              required
              fullWidth
              label="Name"
              name="name"
              type="text"
            />
            <MyTextField
              required
              fullWidth
              label="Price"
              name="price"
              type="text"
            />
            <Button fullWidth variant="contained" type="submit" color="primary">
              {submitText}
            </Button>
          </Form>
        </Formik>
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
                  resetError();
                }}
              >
                <CloseIcon fontSize="inherit" />
              </IconButton>
            }
          >
            {error}
          </Alert>
        ) : null}
      </BaseDialog>
    </div>
  );
};

ServiceFormComponent.propTypes = {
  open: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  close: PropTypes.func.isRequired,
  service: PropTypes.instanceOf(Service).isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  validationSchema: PropTypes.object.isRequired,
  submitHandler: PropTypes.func.isRequired,
  submitText: PropTypes.string.isRequired,
  error: PropTypes.string,
  resetError: PropTypes.func.isRequired,
};

ServiceFormComponent.defaultProps = {
  error: null,
};

export default ServiceFormComponent;
