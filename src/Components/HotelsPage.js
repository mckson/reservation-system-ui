import React from 'react';
import PropTypes from 'prop-types';
import { Grid, makeStyles } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import HotelCard from './HotelCard';
import Hotel from '../Models/Hotel';
import PaginationBar from '../Common/PaginationBar';
// import HotelSearchComponent from './HotelSearchComponent';
import SearchBar from './SearchBar/SearchBar';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    justifySelf: 'center',
    padding: theme.spacing(0, 5),
    [theme.breakpoints.up('md')]: {
      padding: theme.spacing(0, 10),
    },
    [theme.breakpoints.up('lg')]: {
      padding: theme.spacing(0, 30),
    },
    [theme.breakpoints.up('xl')]: {
      padding: theme.spacing(0, 60),
    },
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
  dateIn,
  dateOut,
  onDateInChange,
  onDateOutChange,
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
        <SearchBar
          searchHotels={searchHotels}
          dateIn={dateIn}
          dateOut={dateOut}
          onDateInChange={onDateInChange}
          onDateOutChange={onDateOutChange}
        />
      </div>
      <div>
        {hotelInstances.map((hotel) => (
          <Grid key={hotel.id} item className={classes.item} xs={12}>
            <HotelCard
              key={hotel.id}
              hotel={new Hotel(hotel)}
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
  hotels: PropTypes.arrayOf(Hotel),
  totalPages: PropTypes.number,
  totalResults: PropTypes.number,
  onPageChanged: PropTypes.func.isRequired,
  searchHotels: PropTypes.func.isRequired,
  dateIn: PropTypes.string,
  dateOut: PropTypes.string,
  onDateInChange: PropTypes.func.isRequired,
  onDateOutChange: PropTypes.func.isRequired,
};

HotelsPage.defaultProps = {
  hotels: [],
  totalPages: 0,
  totalResults: 0,
  dateIn: null,
  dateOut: null,
};

export default HotelsPage;
