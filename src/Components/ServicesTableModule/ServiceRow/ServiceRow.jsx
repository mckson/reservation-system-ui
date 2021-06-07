import React from 'react';
import PropTypes from 'prop-types';
import ServiceRowComponent from './ServiceRowComponent';
import Service from '../../../Models/Service';
import Hotel from '../../../Models/Hotel';

const ServiceRow = ({ service, deleteService, hotel, updateService }) => {
  return (
    <ServiceRowComponent
      service={service}
      hotel={hotel}
      deleteService={deleteService}
      updateService={updateService}
    />
  );
};

ServiceRow.propTypes = {
  service: PropTypes.instanceOf(Service).isRequired,
  hotel: PropTypes.instanceOf(Hotel).isRequired,
  deleteService: PropTypes.func.isRequired,
  updateService: PropTypes.func.isRequired,
};

export default ServiceRow;
