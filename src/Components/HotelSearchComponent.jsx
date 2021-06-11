import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core';
import SearchBar from 'material-ui-search-bar';
import PropTypes from 'prop-types';

const useStyles = makeStyles((theme) => ({
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    marginLeft: 0,
    width: '100%',
  },
}));

const HotelSearchComponent = ({ searchHotels }) => {
  const [searchRequest, setSearchRequest] = useState('');
  const classes = useStyles();

  return (
    <SearchBar
      variant="outlined"
      value={searchRequest}
      onChange={(request) => setSearchRequest(request)}
      onCancelSearch={() => searchHotels(null)}
      onRequestSearch={() => searchHotels(searchRequest)}
      className={classes.search}
      placeholder="Search... (name city services)"
    />
  );
};

HotelSearchComponent.propTypes = {
  searchHotels: PropTypes.func.isRequired,
};

export default HotelSearchComponent;
