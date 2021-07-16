import React from 'react';
import PropTypes from 'prop-types';
import User from '../../../Models/User';
import UsersTableComponent from './UsersTableComponent';
import HotelBrief from '../../../Models/HotelBrief';
import UserBrief from '../../../Models/UserBrief';

const UsersTable = ({
  users,
  usersBrief,
  onChangeSearchClauses,
  hotels,
  onError,
  onSuccess,
  createUser,
  updateUser,
  deleteUser,
  totalCount,
  pageChanged,
  pageSizeChanged,
  pageSize,
}) => {
  return (
    <UsersTableComponent
      users={users}
      usersBrief={usersBrief}
      onChangeSearchClauses={onChangeSearchClauses}
      hotels={hotels}
      onError={onError}
      onSuccess={onSuccess}
      createUser={createUser}
      updateUser={updateUser}
      deleteUser={deleteUser}
      totalCount={totalCount}
      pageChanged={pageChanged}
      pageSizeChanged={pageSizeChanged}
      pageSize={pageSize}
    />
  );
};

UsersTable.propTypes = {
  users: PropTypes.arrayOf(User),
  usersBrief: PropTypes.arrayOf(UserBrief).isRequired,
  onChangeSearchClauses: PropTypes.func.isRequired,
  hotels: PropTypes.arrayOf(HotelBrief),
  onError: PropTypes.func.isRequired,
  onSuccess: PropTypes.func.isRequired,
  createUser: PropTypes.func.isRequired,
  updateUser: PropTypes.func.isRequired,
  deleteUser: PropTypes.func.isRequired,
  totalCount: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  pageChanged: PropTypes.func.isRequired,
  pageSizeChanged: PropTypes.func.isRequired,
};

UsersTable.defaultProps = {
  users: [],
  hotels: [],
};

export default UsersTable;
