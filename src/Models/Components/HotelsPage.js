import React from 'react';
import PropTypes from 'prop-types';
import { Grid, makeStyles } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import HotelCard from './HotelCard';
import Hotel from '../Models/Hotel';

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    width: '100%',
  },
  item: {
    flexGrow: 1,
  },
}));

const HotelsPage = ({ hotels }) => {
  const classes = useStyles();
  const hotelInstances = hotels.map((hotel) => new Hotel(hotel));
  const history = useHistory();

  const onOpenFullHotel = (hotelToOpen) => {
    history.push(`/Hotels:${hotelToOpen.id}`);
  };

  return (
    <Grid container className={classes.root}>
      {hotelInstances.map((hotel) => (
        <Grid item className={classes.item} xs={12}>
          <HotelCard
            key={hotel.id}
            hotel={hotel}
            onOpenFullHotel={onOpenFullHotel}
          />
        </Grid>
      ))}
    </Grid>
  );
};

HotelsPage.propTypes = {
  hotels: PropTypes.instanceOf(Array).isRequired,
};

export default HotelsPage;
