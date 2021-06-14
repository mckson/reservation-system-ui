import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  makeStyles,
} from '@material-ui/core';
import PropTypes from 'prop-types';
import React from 'react';
import Hotel from '../Models/Hotel';
import defaultImage from '../images/default.png';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    display: 'grid',
    gridTemplateColumns: '1fr 3fr',
    height: 150,
    width: 'auto',
    margin: theme.spacing(2, 0, 0, 0),
    padding: theme.spacing(1),
  },
  details: {
    width: 'auto',
    display: 'flex',
    flexDirection: 'column',
  },
  media: {
    maxWidth: 150,
    width: '100%',
    display: 'block',
  },
  mediaWrapper: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      gridColumn: 1,
      display: 'flex',
      flexGrow: 2,
    },
  },
  info: {
    gridColumn: '1 / span 2',
    flexGrow: 2,
    display: 'flex',
    flexDirection: 'column',
    [theme.breakpoints.up('sm')]: {
      gridColumn: 2,
    },
  },
  actions: {
    flexGrow: 1,
    justifyContent: 'flex-end',
    width: 'auto',
  },
}));

const SmallHotelCard = ({ hotel }) => {
  const { location } = hotel;
  const classes = useStyles();

  return (
    <Card className={classes.root} variant="outlined">
      <div className={classes.mediaWrapper}>
        <CardMedia
          className={classes.media}
          image={
            hotel.mainImage
              ? `data:image/jpeg;base64,${hotel.mainImage.image}`
              : defaultImage
          }
        />
      </div>
      <div className={classes.info}>
        <div className={classes.details}>
          <CardContent>
            <Typography variant="h6">{hotel.name}</Typography>
            <Typography variant="body1">
              {`${location?.street} ${location?.buildingNumber}, ${location?.city}, ${location?.country}`}
            </Typography>
          </CardContent>
        </div>
      </div>
    </Card>
  );
};

SmallHotelCard.propTypes = {
  hotel: PropTypes.instanceOf(Hotel).isRequired,
};

export default SmallHotelCard;
