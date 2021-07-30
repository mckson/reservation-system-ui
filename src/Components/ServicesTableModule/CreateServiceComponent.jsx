import React, { useState } from 'react';
import PropTypes from 'prop-types';
import ServiceForm from './ServiceForm/ServiceForm';
import Hotel from '../../Models/Hotel';
import ServiceWarningContentComponent from './ServiceWarningContentComponent';

const CreateServiceComponent = ({
  open,
  close,
  hotel,
  createService,
  onSuccess,
  onRefresh,
}) => {
  const [error, setError] = useState(null);
  const [creatingService, setCreatingService] = useState(null);

  const formTitle = 'Service creation';
  const formSubmitText = 'Create service';

  const createServiceAsync = async () => {
    const [serviceResponse, errorResponse] = await createService(
      creatingService
    );

    if (errorResponse != null) {
      setError(errorResponse);
    } else {
      onSuccess(`Service ${serviceResponse.name} sucessfully added`);
      close();
      onRefresh();
    }
  };

  const handleSubmit = (values) => {
    const newService = {
      hotelId: hotel.id,
      name: values.name,
      price: parseFloat(values.price),
    };

    setCreatingService(newService);
  };

  const handleResetError = () => {
    setError(null);
  };

  const handleCancel = () => {
    setError('Creating canceled');
  };

  const handleAccept = async () => {
    if (creatingService) {
      await createServiceAsync();
    }
  };

  const warningContent = (
    <ServiceWarningContentComponent
      text={`Room view "${creatingService?.name}" is going to be created. Accept or decline the creating`}
      service={creatingService}
    />
  );

  return (
    <>
      <ServiceForm
        open={open}
        close={close}
        service={null}
        submitHandler={handleSubmit}
        title={formTitle}
        submitText={formSubmitText}
        error={error}
        resetError={handleResetError}
        onAccept={handleAccept}
        onCancel={handleCancel}
        warningContent={warningContent}
        warningTitle="Creating of the service"
        type="create"
        acceptText="Create service"
        cancelText="Cancel"
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
  onRefresh: PropTypes.func.isRequired,
};

export default CreateServiceComponent;
