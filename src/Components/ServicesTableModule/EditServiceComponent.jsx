import React, { useState } from 'react';
import PropTypes from 'prop-types';
import ServiceForm from './ServiceForm/ServiceForm';
import Hotel from '../../Models/Hotel';
import Service from '../../Models/Service';
import ServiceWarningContentComponent from './ServiceWarningContentComponent';

const EditServiceComponent = ({
  open,
  close,
  hotel,
  service,
  updateService,
  onSuccess,
  onRefresh,
}) => {
  const [error, setError] = useState(null);
  const [updatingService, setUpdatingService] = useState({ ...updateService });

  const formTitle = `Service wih id ${service.id} update`;
  const formSubmitText = 'Apply changes';

  const updateServiceAsync = async () => {
    const [serviceResponse, errorResponse] = await updateService(
      updatingService
    );

    if (errorResponse) {
      setError(errorResponse);
    } else {
      onSuccess(`Service ${serviceResponse.name} successfully updated`);
      close();
      onRefresh();
    }
  };

  const handleSubmit = (values) => {
    const newService = {
      id: service.id,
      hotelId: hotel.id,
      name: values.name,
      price: parseFloat(values.price),
    };

    setUpdatingService(new Service(newService));
  };

  const handleCancel = () => {
    setError('Updating canceled');
  };

  const handleAccept = async () => {
    if (updatingService) {
      await updateServiceAsync();
    }
  };

  const handleResetError = () => {
    setError(null);
  };

  const warningContent = (
    <ServiceWarningContentComponent
      text={`Service "${updatingService?.name}" is going to be updated. Accept or decline the updating`}
      service={updatingService}
    />
  );

  return (
    <ServiceForm
      open={open}
      close={close}
      service={service}
      submitHandler={handleSubmit}
      title={formTitle}
      submitText={formSubmitText}
      error={error}
      resetError={handleResetError}
      onAccept={handleAccept}
      onCancel={handleCancel}
      warningContent={warningContent}
      warningTitle="Updating of the service"
      type="update"
      acceptText="Update service"
      cancelText="Cancel"
    />
  );
};

EditServiceComponent.propTypes = {
  open: PropTypes.bool.isRequired,
  close: PropTypes.func.isRequired,
  updateService: PropTypes.func.isRequired,
  hotel: PropTypes.instanceOf(Hotel).isRequired,
  service: PropTypes.instanceOf(Service).isRequired,
  onSuccess: PropTypes.func.isRequired,
  onRefresh: PropTypes.func.isRequired,
};

export default EditServiceComponent;
