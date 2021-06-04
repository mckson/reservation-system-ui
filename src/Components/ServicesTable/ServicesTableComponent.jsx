import React from 'react';
import PropTypes from 'prop-types';
import {
  Table,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from '@material-ui/core';
import Service from '../../Models/Service';

const ServicesTableComponent = ({ services }) => {
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Id</TableCell>
          <TableCell>Name</TableCell>
          <TableCell>Price</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {services != null ? (
          services.map((service) => (
            <ServiceRow service={service} key={service.id} />
          ))
        ) : (
          <div>Loading</div>
        )}
      </TableBody>
    </Table>
  );
};

ServicesTableComponent.propTypes = {
  services: PropTypes.arrayOf(Service).isRequired,
};

const ServiceRow = ({ service }) => {
  return (
    <TableRow>
      <ServiceRowMap service={service} />
    </TableRow>
  );
};

ServiceRow.propTypes = {
  service: PropTypes.instanceOf(Service).isRequired,
};

const ServiceRowMap = ({ service }) => {
  return (
    <>
      <TableCell>{service.id}</TableCell>
      <TableCell>{service.name}</TableCell>
      <TableCell>{service.price}</TableCell>
    </>
  );
};

ServiceRowMap.propTypes = {
  service: PropTypes.instanceOf(Service).isRequired,
};

export default ServicesTableComponent;
