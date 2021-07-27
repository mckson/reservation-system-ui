import React from 'react';
import PropTypes from 'prop-types';
import User from '../../../Models/User';
import UsersTableComponent from './UsersTableComponent';
import HotelBrief from '../../../Models/HotelBrief';
import SearchClause from '../../../Common/BaseSearch/SearchClause';
import SearchRange from '../../../Common/BaseSearch/SearchRange';
import SearchOption from '../../../Common/BaseSearch/SearchOption';

const UsersTable = ({
  onSearch,
  clauses,
  ranges,
  options,
  onChangeClauses,
  onChangeRanges,
  onChangeOptions,
  users,
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
  searchVariants,
}) => {
  return (
    <UsersTableComponent
      onSearch={onSearch}
      clauses={clauses}
      options={options}
      ranges={ranges}
      onChangeClauses={onChangeClauses}
      onChangeRanges={onChangeRanges}
      onChangeOptions={onChangeOptions}
      users={users}
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
      searchVariants={searchVariants}
    />
  );
};

UsersTable.propTypes = {
  onSearch: PropTypes.func.isRequired,
  clauses: PropTypes.arrayOf(SearchClause),
  ranges: PropTypes.arrayOf(SearchRange),
  options: PropTypes.arrayOf(SearchOption),
  onChangeClauses: PropTypes.func,
  onChangeRanges: PropTypes.func,
  onChangeOptions: PropTypes.func,
  users: PropTypes.arrayOf(User),
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
  // eslint-disable-next-line react/forbid-prop-types
  searchVariants: PropTypes.array,
};

UsersTable.defaultProps = {
  users: [],
  hotels: [],
  clauses: [],
  ranges: [],
  options: [],
  searchVariants: [],
  onChangeClauses: null,
  onChangeRanges: null,
  onChangeOptions: null,
};

export default UsersTable;
