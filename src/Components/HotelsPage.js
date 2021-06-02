import React from 'react';
import PropTypes from 'prop-types';
import { Grid, makeStyles } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import HotelCard from './HotelCard';
import Hotel from '../Models/Hotel';
import PaginationBar from '../Common/PaginationBar';
import HotelSearchComponent from './HotelSearchComponent';

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    width: '50%',
    justifySelf: 'center',
  },
  item: {
    flexGrow: 1,
  },
  pagination: {
    display: 'flex',
    justifyContent: 'center',
  },
}));

const HotelsPage = ({
  hotels,
  totalPages,
  totalResults,
  onPageChanged,
  searchHotels,
}) => {
  const classes = useStyles();
  const hotelInstances = hotels.map((hotel) => new Hotel(hotel));
  const history = useHistory();

  const onOpenFullHotel = (hotelToOpen) => {
    console.log(hotelToOpen);
    console.log(totalResults);
    history.push(`/Hotels/${hotelToOpen.id}`);
  };

  return (
    <Grid container className={classes.root}>
      <div className={classes.search}>
        <HotelSearchComponent searchHotels={searchHotels} />
      </div>
      <div>
        {hotelInstances.map((hotel) => (
          <Grid item className={classes.item} xs={12}>
            <HotelCard
              key={hotel.id}
              hotel={hotel}
              onOpenFullHotel={onOpenFullHotel}
            />
          </Grid>
        ))}
      </div>
      <div className={classes.pagination}>
        <PaginationBar totalPages={totalPages} onPageChanged={onPageChanged} />
      </div>
    </Grid>
  );
};

HotelsPage.propTypes = {
  hotels: PropTypes.instanceOf(Array).isRequired,
  totalPages: PropTypes.string.isRequired,
  totalResults: PropTypes.string.isRequired,
  onPageChanged: PropTypes.func.isRequired,
  searchHotels: PropTypes.func.isRequired,
};

export default HotelsPage;
