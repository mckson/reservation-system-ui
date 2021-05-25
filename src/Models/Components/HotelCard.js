import {
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  Typography,
  makeStyles,
} from '@material-ui/core';
import PropTypes from 'prop-types';
import React from 'react';
import Hotel from '../Models/Hotel';

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 250,
    width: 250,
  },
});

const HotelCard = ({ hotel }) => {
  const { location } = hotel;
  const classes = useStyles();
  return (
    <Card className={classes.root}>
      <CardHeader title={hotel.name} />
      <CardContent>
        <Typography>{location?.country}</Typography>
      </CardContent>
      <CardMedia
        className={classes.media}
        image="../../../public/images/default.png"
      />
    </Card>
  );
};

HotelCard.propTypes = {
  hotel: PropTypes.instanceOf(Hotel).isRequired,
};

export default HotelCard;
