import React, { useState } from 'react';
import PropTypes from 'prop-types';
import SearchUsersComponent from './SearchUsersComponent';
import UserBrief from '../../../Models/UserBrief';

const SearchUsers = ({ onChangeSearchClauses, users }) => {
  const [searchEmail, setSearchEmail] = useState(null);
  const [searchSurname, setSearchSurname] = useState(null);
  const [searchName, setSearchName] = useState(null);

  const handleChangeEmail = (value) => {
    setSearchEmail(value);
  };

  const handleChangeSurname = (value) => {
    setSearchSurname(value);
  };

  const handleChangeName = (value) => {
    setSearchName(value);
  };

  const handleSearch = () => {
    const searchClauses = [];
    searchClauses[0] = searchEmail;
    searchClauses[1] = searchSurname;
    searchClauses[2] = searchName;
    onChangeSearchClauses(searchClauses);
  };

  return (
    <SearchUsersComponent
      users={users}
      searchEmail={searchEmail}
      searchSurname={searchSurname}
      searchName={searchName}
      onChangeName={handleChangeName}
      onChangeSurname={handleChangeSurname}
      onChangeEmail={handleChangeEmail}
      onSearch={handleSearch}
    />
  );
};

SearchUsers.propTypes = {
  onChangeSearchClauses: PropTypes.func.isRequired,
  users: PropTypes.arrayOf(UserBrief).isRequired,
};

export default SearchUsers;
