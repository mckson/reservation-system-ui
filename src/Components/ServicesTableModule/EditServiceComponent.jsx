import React, { useState } from 'react';
import PropTypes from 'prop-types';

import ServiceForm from './ServiceForm/ServiceForm';
import Hotel from '../../Models/Hotel';
import Service from '../../Models/Service';

const EditServiceComponent = ({
  open,
  close,
  hotel,
  service,
  updateService,
}) => {
  const formTitle = `Service wih id ${service.id} update`;
  const formSubmitText = 'Apply changes';
  const [error, setError] = useState(null);

  const onUpdateServiceAsync = async (values) => {
    const updatedService = {
      id: service.id,
      hotelId: hotel.id,
      name: values.name,
      price: parseFloat(values.price),
    };

    const errorResponse = await updateService(updatedService);

    if (errorResponse) {
      setError(errorResponse);
    } else {
      close();
    }
  };

  const handleResetError = () => {
    setError(null);
  };
  return (
    <ServiceForm
      open={open}
      close={close}
      service={service}
      submitHandler={onUpdateServiceAsync}
      title={formTitle}
      submitText={formSubmitText}
      error={error}
      resetError={handleResetError}
    />
  );
};

EditServiceComponent.propTypes = {
  open: PropTypes.bool.isRequired,
  close: PropTypes.func.isRequired,
  updateService: PropTypes.func.isRequired,
  hotel: PropTypes.instanceOf(Hotel).isRequired,
  service: PropTypes.instanceOf(Service).isRequired,
};

export default EditServiceComponent;
