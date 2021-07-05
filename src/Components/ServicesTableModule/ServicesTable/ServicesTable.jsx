import React from 'react';
import PropTypes from 'prop-types';
import ServicesTableComponent from './ServicesTableComponent';
import Service from '../../../Models/Service';
import Hotel from '../../../Models/Hotel';

const ServicesTable = ({
  services,
  hotel,
  createService,
  deleteService,
  updateService,
  onError,
  onSuccess,
}) => {
  return (
    <ServicesTableComponent
      services={services}
      hotel={hotel}
      createService={createService}
      deleteService={deleteService}
      updateService={updateService}
      onSuccess={onSuccess}
      onError={onError}
    />
  );
};

ServicesTable.propTypes = {
  services: PropTypes.instanceOf(Service).isRequired,
  hotel: PropTypes.instanceOf(Hotel).isRequired,
  createService: PropTypes.func.isRequired,
  deleteService: PropTypes.func.isRequired,
  updateService: PropTypes.func.isRequired,
  onSuccess: PropTypes.func.isRequired,
  onError: PropTypes.func.isRequired,
};
export default ServicesTable;
