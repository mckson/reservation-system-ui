import React, { useState } from 'react';
import PropTypes from 'prop-types';
import ServiceForm from './ServiceForm/ServiceForm';
import Hotel from '../../Models/Hotel';

const CreateServiceComponent = ({
  open,
  close,
  hotel,
  createService,
  onSuccess,
}) => {
  const formTitle = 'Service creation';
  const formSubmitText = 'Create service';
  const [error, setError] = useState(null);

  const onCreateServiceAsync = async (values) => {
    const createdService = {
      hotelId: hotel.id,
      name: values.name,
      price: parseFloat(values.price),
    };

    const errorResponse = await createService(createdService);

    if (errorResponse != null) {
      setError(errorResponse);
    } else {
      onSuccess('Service sucessfully added');
      close();
    }
  };

  const handleResetError = () => {
    setError(null);
  };

  return (
    <>
      <ServiceForm
        open={open}
        close={close}
        service={null}
        submitHandler={onCreateServiceAsync}
        title={formTitle}
        submitText={formSubmitText}
        error={error}
        resetError={handleResetError}
      />
    </>
  );
};

CreateServiceComponent.propTypes = {
  open: PropTypes.bool.isRequired,
  close: PropTypes.func.isRequired,
  createService: PropTypes.func.isRequired,
  hotel: PropTypes.instanceOf(Hotel).isRequired,
  onSuccess: PropTypes.func.isRequired,
};

export default CreateServiceComponent;
