import React from 'react';
import PropTypes from 'prop-types';
import ServiceRowComponent from './ServiceRowComponent';
import Service from '../../../Models/Service';
import Hotel from '../../../Models/Hotel';

const ServiceRow = ({
  service,
  deleteService,
  hotel,
  updateService,
  onError,
  onSuccess,
  onRefresh,
}) => {
  return (
    <ServiceRowComponent
      service={service}
      hotel={hotel}
      deleteService={deleteService}
      updateService={updateService}
      onError={onError}
      onSuccess={onSuccess}
      onRefresh={onRefresh}
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
