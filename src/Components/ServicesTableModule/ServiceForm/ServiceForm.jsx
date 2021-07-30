import React, { useState } from 'react';
import PropTypes from 'prop-types';
import * as Yup from 'yup';
import ServiceFormComponent from './ServiceFormComponent';
import Service from '../../../Models/Service';
import ServiceWarningContentComponent from '../ServiceWarningContentComponent';

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
  onCancel,
  onAccept,
  type,
  warningContent,
  warningTitle,
  acceptText,
  cancelText,
}) => {
  const [openWarning, setOpenWarning] = useState(false);

  const handleOpenWarning = () => {
    setOpenWarning(true);
  };

  const handleCloseWarning = () => {
    setOpenWarning(false);
  };
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
      type={type}
      warningContent={warningContent}
      warningTitle={warningTitle}
      onAccept={onAccept}
      onCancel={onCancel}
      openWarning={openWarning}
      onOpenWarning={handleOpenWarning}
      onCloseWarning={handleCloseWarning}
      acceptText={acceptText}
      cancelText={cancelText}
    />
  );
};

ServiceForm.propTypes = {
  open: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  close: PropTypes.func.isRequired,
  service: PropTypes.instanceOf(Service),
  submitHandler: PropTypes.func.isRequired,
  submitText: PropTypes.string,
  error: PropTypes.string,
  resetError: PropTypes.func.isRequired,
  onCancel: PropTypes.func,
  onAccept: PropTypes.func,
  type: PropTypes.string,
  warningContent: PropTypes.instanceOf(ServiceWarningContentComponent),
  warningTitle: PropTypes.string,
  acceptText: PropTypes.string,
  cancelText: PropTypes.string,
};

ServiceForm.defaultProps = {
  service: null,
  submitText: 'Submit',
  error: null,
  onCancel: PropTypes.func,
  onAccept: PropTypes.func,
  type: PropTypes.string,
  warningContent: PropTypes.instanceOf(ServiceWarningContentComponent),
  warningTitle: null,
  acceptText: null,
  cancelText: null,
};

export default ServiceForm;
