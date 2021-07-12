import React from 'react';
import PropTypes from 'prop-types';
import { TableCell } from '@material-ui/core';
import User from '../../Models/User';

const UserRowMap = ({ user }) => {
  return (
    <>
      <TableCell>{user.id}</TableCell>
      <TableCell>{user.firstName}</TableCell>
      <TableCell>{user.lastName}</TableCell>
      <TableCell>{user.userName}</TableCell>
      <TableCell>{user.email}</TableCell>
      <TableCell>{user.dateOfBirth}</TableCell>
      <TableCell>{user.phoneNumber}</TableCell>
      <TableCell>{user.roles.map((role) => `${role} `)}</TableCell>
    </>
  );
};

UserRowMap.propTypes = {
  user: PropTypes.instanceOf(User).isRequired,
};

export default UserRowMap;
