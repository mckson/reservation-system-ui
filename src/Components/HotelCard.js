import {
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  Typography,
  makeStyles,
  CardActions,
  Button,
} from '@material-ui/core';
import PropTypes from 'prop-types';
import React from 'react';
import Hotel from '../Models/Hotel';
import defaultImage from '../images/default.png';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    display: 'flex',
    width: 'auto',
    margin: theme.spacing(2, 3, 0, 3),
    padding: theme.spacing(1),
  },
  details: {
    flexGrow: 3,
    width: 'auto',
    display: 'flex',
    flexDirection: 'column',
  },
  media: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      flexGrow: 1,
      display: 'block',
      height: 'auto',
      width: '25%',
    },
  },
  info: {
    flexGrow: 3,
    display: 'flex',
    flexDirection: 'column',
  },
  actions: {
    flexGrow: 1,
    justifyContent: 'flex-end',
    width: 'auto',
  },
}));

const HotelCard = ({ hotel, onOpenFullHotel }) => {
  const { location } = hotel;
  const classes = useStyles();

  return (
    <Card className={classes.root} variant="outlined">
      <CardMedia
        className={classes.media}
        image={
          hotel.mainImage
            ? `data:image/jpeg;base64,${hotel.mainImage.image}`
            : defaultImage
        }
      />
      <div className={classes.info}>
        <div className={classes.details}>
          <CardHeader title={hotel.name} />
          <CardContent>
            <Typography>
              <b>Country</b> {location?.country}
            </Typography>
            <Typography>
              <b>Region</b> {location?.region}
            </Typography>
            <Typography>
              <b>City</b> {location?.city}
            </Typography>
            <Typography>
              <b>Street</b> {location?.street}, {location?.buildingNumber}
            </Typography>
          </CardContent>
        </div>
        <CardActions className={classes.actions}>
          <Button onClick={() => onOpenFullHotel(hotel)}>Explore</Button>
        </CardActions>
      </div>
    </Card>
  );
};

HotelCard.propTypes = {
  hotel: PropTypes.instanceOf(Hotel).isRequired,
  onOpenFullHotel: PropTypes.func.isRequired,
};

export default HotelCard;
