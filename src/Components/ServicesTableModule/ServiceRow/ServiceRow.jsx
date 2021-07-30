import React, { useState } from 'react';
import PropTypes from 'prop-types';
import ServiceRowComponent from './ServiceRowComponent';
import Service from '../../../Models/Service';
import Hotel from '../../../Models/Hotel';
import ServiceWarningContentComponent from '../ServiceWarningContentComponent';

const ServiceRow = ({
  service,
  deleteService,
  hotel,
  updateService,
  onError,
  onSuccess,
  onRefresh,
}) => {
  const [openWarning, setOpenWarning] = useState(false);

  const deleteServiceAsync = async () => {
    const [serviceResponse, errorResponse] = await deleteService(service.id);

    if (errorResponse) {
      onError(errorResponse);
    } else {
      onSuccess(`Service ${serviceResponse.name} successfully deleted`);
      onRefresh();
    }
  };

  const handleOpenWarning = () => {
    setOpenWarning(true);
  };

  const handleCloseWarning = () => {
    setOpenWarning(false);
  };

  const handleCancel = () => {
    onError('Deleting canceled');
  };

  const handleAccept = async () => {
    if (service) {
      await deleteServiceAsync();
    }
  };

  const warningContent = (
    <ServiceWarningContentComponent
      text={`Service "${service?.name}" is going to be updated. Accept or decline the updating`}
      service={service}
    />
  );

  return (
    <ServiceRowComponent
      service={service}
      hotel={hotel}
      updateService={updateService}
      onError={onError}
      onSuccess={onSuccess}
      onRefresh={onRefresh}
      onAccept={handleAccept}
      onCancel={handleCancel}
      openWarning={openWarning}
      onOpenWarning={handleOpenWarning}
      onCloseWarning={handleCloseWarning}
      warningContent={warningContent}
    />
  );
};

ServiceRow.propTypes = {
  service: PropTypes.instanceOf(Service).isRequired,
  hotel: PropTypes.instanceOf(Hotel).isRequired,
  deleteService: PropTypes.func.isRequired,
  updateService: PropTypes.func.isRequired,
  onSuccess: PropTypes.func.isRequired,
  onError: PropTypes.func.isRequired,
  onRefresh: PropTypes.func.isRequired,
};

export default ServiceRow;
