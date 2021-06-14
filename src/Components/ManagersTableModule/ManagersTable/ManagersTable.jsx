import React from 'react';
import PropTypes from 'prop-types';
import ManagersTableComponent from './ManagersTableComponent';
import Hotel from '../../../Models/Hotel';
import User from '../../../Models/User';

const ManagersTable = ({ hotel, users, updateUser, onSuccess, onError }) => {
  return (
    <ManagersTableComponent
      hotel={hotel}
      users={users}
      updateUser={updateUser}
      onSuccess={onSuccess}
      onError={onError}
    />
  );
};

ManagersTable.propTypes = {
  hotel: PropTypes.instanceOf(Hotel).isRequired,
  users: PropTypes.arrayOf(User).isRequired,
  updateUser: PropTypes.func.isRequired,
  onError: PropTypes.func.isRequired,
  onSuccess: PropTypes.func.isRequired,
};

export default ManagersTable;
