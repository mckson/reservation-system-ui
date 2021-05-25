import React from 'react';
import PropTypes from 'prop-types';
import Hotel from '../Models/Hotel';

const HotelFull = ({ hotel }) => {
  return <div>{hotel.name}</div>;
};

HotelFull.propTypes = {
  hotel: PropTypes.instanceOf(Hotel).isRequired,
};

export default HotelFull;
