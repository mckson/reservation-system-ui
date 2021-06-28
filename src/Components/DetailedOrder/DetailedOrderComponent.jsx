import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Typography, makeStyles, Box, Link } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import ReservationDetailedResponse from '../../Models/ReservationDetailedResponse';
import Constants from '../../Common/Constants';

const useStyles = makeStyles(() => ({
  content: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
}));
const DetailedOrderComponent = ({ reservation }) => {
  const classes = useStyles();
  const history = useHistory();
  return (
    <Grid container>
      <Grid item xs={12}>
        <Typography component="div" className={classes.content}>
          <Box fontWeight="fontWeightMedium">Id</Box>
          <Box>{reservation.id}</Box>
        </Typography>
        <Typography component="div" className={classes.content}>
          <Box fontWeight="fontWeightMedium">Hotel</Box>
          <Link
            href={`/Hotels/${reservation.hotel.id}`}
            onClick={() => history.push(`/Hotels/${reservation.hotel.id}`)}
          >
            {reservation.hotel.name}
          </Link>
        </Typography>
        <Typography>Reserved rooms and services</Typography>
        <Typography component="div" className={classes.content}>
          <Box fontWeight="fontWeightMedium">Rooms</Box>
          <Box display="flex" flexDirection="column">
            {reservation.rooms.map((room) => (
              <Link
                align="right"
                key={room.id}
                href={`/Rooms/${room.id}`}
                onClick={() => history.push(`/Rooms/${room.id}`)}
              >
                Room #{room.roomNumber}
              </Link>
            ))}
          </Box>
        </Typography>{' '}
        <Typography component="div" className={classes.content}>
          <Box fontWeight="fontWeightMedium">Services</Box>
          <Box display="flex" flexDirection="column" alignContent="right">
            {reservation.services.map((service) => (
              <Typography key={service.id} align="right">
                {service.name} (${service.price})
              </Typography>
            ))}
          </Box>
        </Typography>
        <Typography>Customer information</Typography>
        <Typography component="div" className={classes.content}>
          <Box fontWeight="fontWeightMedium">Surname</Box>
          <Box>{reservation.surname}</Box>
        </Typography>
        <Typography component="div" className={classes.content}>
          <Box fontWeight="fontWeightMedium">Name</Box>
          <Box>{reservation.name}</Box>
        </Typography>
        <Typography component="div" className={classes.content}>
          <Box fontWeight="fontWeightMedium">Email</Box>
          <Box>{reservation.email}</Box>
        </Typography>
        <Typography>Reservation details</Typography>
        <Typography component="div" className={classes.content}>
          <Box fontWeight="fontWeightMedium">Reservation time</Box>
          <Box>
            {reservation.reservedTime.toLocaleDateString(
              'en-US',
              Constants.dateAndTimeOptions
            )}
          </Box>
        </Typography>
        <Typography component="div" className={classes.content}>
          <Box fontWeight="fontWeightMedium">Date-in</Box>
          <Box>
            {reservation.dateIn.toLocaleDateString(
              'en-US',
              Constants.dateOptions
            )}
          </Box>
        </Typography>
        <Typography component="div" className={classes.content}>
          <Box fontWeight="fontWeightMedium">Date-out</Box>
          <Box>
            {reservation.dateOut.toLocaleDateString(
              'en-US',
              Constants.dateOptions
            )}
          </Box>
        </Typography>
        <Typography component="div" className={classes.content}>
          <Box fontWeight="fontWeightMedium">Total length of stay</Box>
          <Box>{reservation.totalNights}</Box>
        </Typography>
        <Typography>Price details</Typography>
        <Typography component="div" className={classes.content}>
          <Box fontWeight="fontWeightMedium">Price for rooms</Box>
          <Box>${reservation.priceForRooms}</Box>
        </Typography>
        <Typography component="div" className={classes.content}>
          <Box fontWeight="fontWeightMedium">Price for services</Box>
          <Box>${reservation.priceForServices}</Box>
        </Typography>
        <Typography component="div" className={classes.content}>
          <Box fontWeight="fontWeightMedium">Hotel's deposit</Box>
          <Box>${reservation.deposit}</Box>
        </Typography>
        <Typography component="div" className={classes.content}>
          <Box fontWeight="fontWeightMedium">Total price</Box>
          <Box>${reservation.totalPrice}</Box>
        </Typography>
      </Grid>
    </Grid>
  );
};

DetailedOrderComponent.propTypes = {
  reservation: PropTypes.instanceOf(ReservationDetailedResponse).isRequired,
};

export default DetailedOrderComponent;
