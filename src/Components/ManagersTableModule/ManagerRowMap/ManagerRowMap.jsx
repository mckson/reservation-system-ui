import { TableCell } from '@material-ui/core';
import React from 'react';
import PropTypes from 'prop-types';
import User from '../../../Models/User';

const ManagerRowMap = ({ manager }) => {
  return (
    <>
      <TableCell>{manager.id}</TableCell>
      <TableCell>{manager.firstName}</TableCell>
      <TableCell>{manager.lastName}</TableCell>
      <TableCell>{manager.email}</TableCell>
    </>
  );
};

ManagerRowMap.propTypes = {
  manager: PropTypes.instanceOf(User).isRequired,
};

export default ManagerRowMap;
