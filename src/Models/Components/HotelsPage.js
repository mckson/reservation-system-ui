import React from 'react';
import PropTypes from 'prop-types';
import { Grid } from '@material-ui/core';
import HotelCard from './HotelCard';
import Hotel from '../Models/Hotel';

const HotelsPage = ({ hotels }) => {
  const hotelInstances = hotels.map((hotel) => new Hotel(hotel));
  return (
    <Grid container spacing={4}>
      {hotelInstances.map((hotel) => (
        <HotelCard key={hotel.id} hotel={hotel} />
      ))}
    </Grid>
  );
};

HotelsPage.propTypes = {
  hotels: PropTypes.instanceOf(Array).isRequired,
};

export default HotelsPage;
