import React, { useState } from 'react';
import PropTypes from 'prop-types';
import SearchClause from './SearchClauses';
import BaseSearchComponent from './BaseSearchComponent';

const BaseSearch = ({ clauses }) => {
  const [searchClauses, setSearchClauses] = useState(clauses);

  const handleChangeSearchClauses = (newSearchClauses) => {
    // eslint-disable-next-line no-debugger
    debugger;
    setSearchClauses(newSearchClauses);
  };

  return (
    <BaseSearchComponent
      searchClauses={searchClauses}
      onChangeSearchClauses={handleChangeSearchClauses}
    />
  );
};

BaseSearch.propTypes = {
  //   filters: PropTypes.arrayOf(PropTypes.string),
  clauses: PropTypes.arrayOf(SearchClause),
};

BaseSearch.defaultProps = {
  //   filters: [],
  clauses: [],
};

export default BaseSearch;
