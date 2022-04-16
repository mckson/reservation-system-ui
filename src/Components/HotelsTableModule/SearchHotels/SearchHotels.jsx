import React, { useState } from 'react';
import PropTypes from 'prop-types';
import HotelBrief from '../../../Models/HotelBrief';
import SearchHotelsComponent from './SearchHotelsComponent';

const SearchHotels = ({ onChangeSearchParameters, hotels }) => {
  const [searchName, setSearchName] = useState(null);

  const handleChangeName = (value) => {
    setSearchName(value);
  };

  const handleSearch = () => {
    onChangeSearchParameters(searchName);
  };

  return (
    <SearchHotelsComponent
      hotels={hotels}
      searchName={searchName}
      onChangeName={handleChangeName}
      onSearch={handleSearch}
    />
  );
};

SearchHotels.propTypes = {
  onChangeSearchParameters: PropTypes.func.isRequired,
  hotels: PropTypes.arrayOf(HotelBrief).isRequired,
};

export default SearchHotels;
