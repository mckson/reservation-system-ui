import React, { useState } from 'react';
import PropTypes from 'prop-types';
import SearchClause from './SearchClause';
import BaseSearchComponent from './BaseSearchComponent';
import SearchOption from './SearchOption';

const BaseSearch = ({ clauses, onSearch, options }) => {
  const [searchClauses, setSearchClauses] = useState(clauses);
  const [searchOptions, setSearchOptions] = useState(options);

  const handleChangeSearchClauses = (newSearchClauses) => {
    setSearchClauses(newSearchClauses);
  };

  const handleChangeSearchOptions = (newSearchOptions) => {
    setSearchOptions(newSearchOptions);
  };

  const handleSearch = () => {
    onSearch(searchClauses);
  };

  return (
    <BaseSearchComponent
      searchClauses={searchClauses}
      searchOptions={searchOptions}
      onChangeSearchClauses={handleChangeSearchClauses}
      onChangeSearchOptions={handleChangeSearchOptions}
      onSearch={handleSearch}
    />
  );
};

BaseSearch.propTypes = {
  //   filters: PropTypes.arrayOf(PropTypes.string),
  clauses: PropTypes.arrayOf(SearchClause),
  options: PropTypes.arrayOf(SearchOption),
  onSearch: PropTypes.func.isRequired,
};

BaseSearch.defaultProps = {
  //   filters: [],
  clauses: [],
  options: [],
};

export default BaseSearch;
