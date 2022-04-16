import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Typography, Box, makeStyles } from '@material-ui/core';
import Room from '../../Models/Room';
import defaultImage from '../../images/default.png';

const useStyles = makeStyles((theme) => ({
  labelAndValue: {
    display: 'flex',
    alignItems: 'top',
    justifyContent: 'space-between',
    padding: theme.spacing(0, 1, 0, 0),
  },
  wrapper: {},
}));

const RoomWarningContentComponent = ({ room, image, text }) => {
  const classes = useStyles();
  return (
    <Grid container spacing={3}>
      <Grid item container alignItems="center" xs={12}>
        <Grid item xs={7}>
          <Typography component="div" className={classes.labelAndValue}>
            <Box>Name</Box>
            <Box fontWeight="fontWeightMedium">{room.name}</Box>
          </Typography>
          <Typography component="div" className={classes.labelAndValue}>
            <Box>Number</Box>
            <Box fontWeight="fontWeightMedium">{room.roomNumber}</Box>
          </Typography>
          <Typography component="div" className={classes.labelAndValue}>
            <Box>Floor</Box>
            <Box fontWeight="fontWeightMedium">${room.floorNumber}</Box>
          </Typography>
          <Typography component="div" className={classes.labelAndValue}>
            <Box>Price per night</Box>
            <Box fontWeight="fontWeightMedium" textAlign="right">
              ${room.price}
            </Box>
          </Typography>
          <Typography component="div" className={classes.labelAndValue}>
            <Box>Beds</Box>
            <Box fontWeight="fontWeightMedium">{room.capacity}</Box>
          </Typography>
          <Typography component="div" className={classes.labelAndValue}>
            <Box>Area</Box>
            <Box fontWeight="fontWeightMedium">
              {room.area} m<sup>2</sup>
            </Box>
          </Typography>
          <Typography component="div" className={classes.labelAndValue}>
            <Box>Description</Box>
            <Box fontWeight="fontWeightMedium">{room.description}</Box>
          </Typography>
          <Typography component="div" className={classes.labelAndValue}>
            <Box>Smoking</Box>
            <Box fontWeight="fontWeightMedium">
              {room.smoking ? 'Allowed' : 'No smoking'}
            </Box>
          </Typography>{' '}
          <Typography component="div" className={classes.labelAndValue}>
            <Box>Parking</Box>
            <Box fontWeight="fontWeightMedium">
              {room.parking ? 'Available' : 'Unavailable'}
            </Box>
          </Typography>
          <Typography component="div" className={classes.labelAndValue}>
            <Box>Facilities</Box>
            <div>
              {room.facilities.map((facility) => (
                <Box fontWeight="fontWeightMedium">{facility}</Box>
              ))}
            </div>
          </Typography>
        </Grid>
        <Grid item xs={5} align="right" className={classes.wrapper}>
          <img
            style={{ width: '100%', height: '100%', objectFit: 'contain' }}
            src={image ? image.image : defaultImage}
            alt="hotel"
          />
        </Grid>
      </Grid>
      {text ? (
        <Grid item xs={12}>
          <Typography>{text}</Typography>
        </Grid>
      ) : null}
    </Grid>
  );
};

RoomWarningContentComponent.propTypes = {
  room: PropTypes.instanceOf(Room).isRequired,
  text: PropTypes.string,
  // eslint-disable-next-line react/forbid-prop-types
  image: PropTypes.object,
};

RoomWarningContentComponent.defaultProps = {
  text: null,
  image: null,
};

export default RoomWarningContentComponent;
