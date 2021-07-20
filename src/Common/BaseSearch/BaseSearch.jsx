import React, { useState } from 'react';
import PropTypes from 'prop-types';
import SearchClause from './SearchClause';
import BaseSearchComponent from './BaseSearchComponent';
import SearchOption from './SearchOption';
import SearchRange from './SearchRange';

const BaseSearch = ({
  clauses,
  onSearch,
  options,
  ranges,
  onChangeOptions,
  onChangeClauses,
  onChangeRanges,
}) => {
  const [searchClauses, setSearchClauses] = useState(clauses);
  const [searchOptions, setSearchOptions] = useState(options);
  const [searchRanges, setSearchRanges] = useState(ranges);

  const handleChangeSearchClauses = (newSearchClauses) => {
    if (onChangeClauses) {
      onChangeClauses(newSearchClauses);
    }
    setSearchClauses(newSearchClauses);
  };

  const handleChangeSearchOptions = (newSearchOptions) => {
    if (onChangeOptions) {
      onChangeOptions(newSearchOptions);
    }
    setSearchOptions(newSearchOptions);
  };

  const handleChangesSearchRanges = (newSearchRanges) => {
    if (onChangeRanges) {
      onChangeRanges(newSearchRanges);
    }
    setSearchRanges(newSearchRanges);
  };

  const handleSearch = () => {
    onSearch(searchClauses, searchOptions, searchRanges);
  };

  return (
    <BaseSearchComponent
      searchClauses={searchClauses}
      searchOptions={searchOptions}
      searchRanges={searchRanges}
      onChangeSearchClauses={handleChangeSearchClauses}
      onChangeSearchOptions={handleChangeSearchOptions}
      onChangeSearchRanges={handleChangesSearchRanges}
      onSearch={handleSearch}
    />
  );
};

BaseSearch.propTypes = {
  clauses: PropTypes.arrayOf(SearchClause),
  options: PropTypes.arrayOf(SearchOption),
  ranges: PropTypes.arrayOf(SearchRange),
  onSearch: PropTypes.func.isRequired,
  onChangeOptions: PropTypes.func,
  onChangeClauses: PropTypes.func,
  onChangeRanges: PropTypes.func,
};

BaseSearch.defaultProps = {
  clauses: [],
  options: [],
  ranges: [],
  onChangeOptions: null,
  onChangeRanges: null,
  onChangeClauses: null,
};

export default BaseSearch;
