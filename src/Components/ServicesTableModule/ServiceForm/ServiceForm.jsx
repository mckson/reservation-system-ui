import React from 'react';
import * as Yup from 'yup';
import PropTypes from 'prop-types';
import ServiceFormComponent from './ServiceFormComponent';
import Service from '../../../Models/Service';

const validationSchema = Yup.object({
  name: Yup.string()
    .max(200, 'Must be 200 characters or less')
    .min(2, 'Must be 2 characters or more')
    .required('Required'),
  price: Yup.number().min(1, 'Must be 1 or more').required('Required'),
});

const ServiceForm = ({
  open,
  title,
  close,
  service,
  submitHandler,
  submitText,
  error,
  resetError,
}) => {
  return (
    <ServiceFormComponent
      open={open}
      close={close}
      service={service}
      submitHandler={submitHandler}
      submitText={submitText}
      title={title}
      validationSchema={validationSchema}
      error={error}
      resetError={resetError}
    />
  );
};

ServiceForm.propTypes = {
  open: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  close: PropTypes.func.isRequired,
  service: PropTypes.instanceOf(Service).isRequired,
  submitHandler: PropTypes.func.isRequired,
  submitText: PropTypes.string,
  error: PropTypes.string,
  resetError: PropTypes.func.isRequired,
};

ServiceForm.defaultProps = {
  submitText: 'Submit',
  error: null,
};

export default ServiceForm;
