import React from 'react';
import PropTypes from 'prop-types';
import { TableCell } from '@material-ui/core';
import Service from '../../../Models/Service';

const ServiceRowMap = ({ service }) => {
  return (
    <>
      <TableCell>{service.id}</TableCell>
      <TableCell>{service.name}</TableCell>
      <TableCell align="right">${service.price}</TableCell>
    </>
  );
};

ServiceRowMap.propTypes = {
  service: PropTypes.instanceOf(Service).isRequired,
};

export default ServiceRowMap;
