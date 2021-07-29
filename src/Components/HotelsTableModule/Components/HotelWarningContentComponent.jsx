import React from 'react';
import PropTypes from 'prop-types';
import { Box, Grid, Typography, makeStyles } from '@material-ui/core';
import Hotel from '../../../Models/Hotel';
import defaultImage from '../../../images/default.png';

const useStyles = makeStyles((theme) => ({
  labelAndValue: {
    display: 'flex',
    alignItems: 'top',
    justifyContent: 'space-between',
    padding: theme.spacing(0, 1, 0, 0),
  },
  wrapper: {},
}));

const HotelWarningContentComponent = ({ text, hotel, image }) => {
  const classes = useStyles();
  return (
    <Grid container spacing={3}>
      <Grid item container alignItems="center" xs={12}>
        <Grid item xs={7}>
          <Typography component="div" className={classes.labelAndValue}>
            <Box>Name</Box>
            <Box fontWeight="fontWeightMedium">{hotel.name}</Box>
          </Typography>
          <Typography component="div" className={classes.labelAndValue}>
            <Box>Floors</Box>
            <Box fontWeight="fontWeightMedium">{hotel.numberFloors}</Box>
          </Typography>
          <Typography component="div" className={classes.labelAndValue}>
            <Box>Deposit</Box>
            <Box fontWeight="fontWeightMedium">${hotel.deposit}</Box>
          </Typography>
          <Typography component="div" className={classes.labelAndValue}>
            <Box>Description</Box>
            <Box fontWeight="fontWeightMedium" textAlign="right">
              {hotel.description}
            </Box>
          </Typography>
          <Typography component="div" className={classes.labelAndValue}>
            <Box>Country</Box>
            <Box fontWeight="fontWeightMedium">{hotel.location.country}</Box>
          </Typography>
          <Typography component="div" className={classes.labelAndValue}>
            <Box>Region</Box>
            <Box fontWeight="fontWeightMedium">{hotel.location.region}</Box>
          </Typography>
          <Typography component="div" className={classes.labelAndValue}>
            <Box>City</Box>
            <Box fontWeight="fontWeightMedium">{hotel.location.city}</Box>
          </Typography>
          <Typography component="div" className={classes.labelAndValue}>
            <Box>Street</Box>
            <Box fontWeight="fontWeightMedium">
              {hotel.location.street} {hotel.location.buildingNumber}
            </Box>
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

HotelWarningContentComponent.propTypes = {
  hotel: PropTypes.instanceOf(Hotel).isRequired,
  text: PropTypes.string,
  // eslint-disable-next-line react/forbid-prop-types
  image: PropTypes.object,
};

HotelWarningContentComponent.defaultProps = {
  text: null,
  image: null,
};

export default HotelWarningContentComponent;
