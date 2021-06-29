/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Typography, makeStyles, Box, Link } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import ReservationDetailedResponse from '../../Models/ReservationDetailedResponse';
import Constants from '../../Common/Constants';
import BaseDialog from '../../Common/BaseDialog';
import RoomDetailed from '../RoomDetailed/RoomDetailed';

const useStyles = makeStyles((theme) => ({
  contentGroup: {
    display: 'flex',
    flexDirection: 'column',
    padding: theme.spacing(2),
    margin: theme.spacing(0, 0, 1, 0),
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: theme.palette.grey[300],
    borderRadius: theme.shape.borderRadius,
  },
  content: {
    display: 'flex',
    justifyContent: 'space-between',
  },
}));
const DetailedOrderComponent = ({
  reservation,
  selectedRoomId,
  isRoomDetailedOpen,
  selectedRoomChanged,
  closeRoomDetailed,
  openRoomDetailed,
}) => {
  const classes = useStyles();
  const history = useHistory();

  return (
    <>
      <Grid container>
        <Grid item xs={12} className={classes.contentGroup}>
          <Typography component="div" className={classes.content}>
            <Box>Hotel</Box>
            <Link
              href={`/Hotels/${reservation.hotel.id}`}
              onClick={() => history.push(`/Hotels/${reservation.hotel.id}`)}
            >
              {reservation.hotel.name}
            </Link>
          </Typography>
        </Grid>
        <Grid item xs={12} className={classes.contentGroup}>
          <Typography variant="h6">
            <Box fontWeight="fontWeightMedium">Reserved rooms and services</Box>
          </Typography>
          <Typography component="div" className={classes.content}>
            <Box>Rooms</Box>
            <Box display="flex" flexDirection="column">
              {reservation.rooms.map((room) => (
                <Link
                  align="right"
                  key={room.id}
                  onClick={() => {
                    selectedRoomChanged(room.id);
                    openRoomDetailed();
                  }}
                >
                  Room #{room.roomNumber} (${room.price} per night)
                </Link>
              ))}
            </Box>
          </Typography>
          {reservation.services && reservation.services.length > 0 ? (
            <Typography component="div" className={classes.content}>
              <Box>Services</Box>
              <Box display="flex" flexDirection="column" alignContent="right">
                {reservation.services.map((service) => (
                  <Typography key={service.id} align="right">
                    {service.name} (${service.price})
                  </Typography>
                ))}
              </Box>
            </Typography>
          ) : null}
        </Grid>
        <Grid item xs={12} className={classes.contentGroup}>
          <Typography variant="h6">
            <Box fontWeight="fontWeightMedium">Customer information</Box>
          </Typography>
          <Typography component="div" className={classes.content}>
            <Box>Surname</Box>
            <Box>{reservation.surname}</Box>
          </Typography>
          <Typography component="div" className={classes.content}>
            <Box>Name</Box>
            <Box>{reservation.name}</Box>
          </Typography>
          <Typography component="div" className={classes.content}>
            <Box>Email</Box>
            <Box>{reservation.email}</Box>
          </Typography>
        </Grid>
        <Grid item xs={12} className={classes.contentGroup}>
          <Typography variant="h6">
            <Box fontWeight="fontWeightMedium">Reservation details</Box>
          </Typography>
          <Typography component="div" className={classes.content}>
            <Box>Reservation time</Box>
            <Box>
              {reservation.reservedTime.toLocaleDateString(
                'en-US',
                Constants.dateAndTimeOptions
              )}
            </Box>
          </Typography>
          <Typography component="div" className={classes.content}>
            <Box>Date-in</Box>
            <Box>
              {reservation.dateIn.toLocaleDateString(
                'en-US',
                Constants.dateOptions
              )}
            </Box>
          </Typography>
          <Typography component="div" className={classes.content}>
            <Box>Date-out</Box>
            <Box>
              {reservation.dateOut.toLocaleDateString(
                'en-US',
                Constants.dateOptions
              )}
            </Box>
          </Typography>
          <Typography component="div" className={classes.content}>
            <Box>Total length of stay</Box>
            <Box>{reservation.totalNights}</Box>
          </Typography>
        </Grid>
        <Grid item xs={12} className={classes.contentGroup}>
          <Typography variant="h6">
            <Box fontWeight="fontWeightMedium">Price details</Box>
          </Typography>
          <Typography component="div" className={classes.content}>
            <Box>Price for rooms</Box>
            <Box>${reservation.priceForRooms}</Box>
          </Typography>
          <Typography component="div" className={classes.content}>
            <Box>Price for services</Box>
            <Box>${reservation.priceForServices}</Box>
          </Typography>
          <Typography component="div" className={classes.content}>
            <Box>Hotel's deposit</Box>
            <Box>${reservation.deposit}</Box>
          </Typography>
          <Typography component="div" className={classes.content}>
            <Box>Total price</Box>
            <Box>${reservation.totalPrice}</Box>
          </Typography>
        </Grid>
      </Grid>
      {selectedRoomId ? (
        <BaseDialog
          open={isRoomDetailedOpen}
          close={closeRoomDetailed}
          width="md"
          title="Room details"
          contentComponent={<RoomDetailed roomId={selectedRoomId} />}
        />
      ) : null}
    </>
  );
};

DetailedOrderComponent.propTypes = {
  reservation: PropTypes.instanceOf(ReservationDetailedResponse).isRequired,
  selectedRoomId: PropTypes.string,
  isRoomDetailedOpen: PropTypes.bool.isRequired,
  selectedRoomChanged: PropTypes.func.isRequired,
  closeRoomDetailed: PropTypes.func.isRequired,
  openRoomDetailed: PropTypes.func.isRequired,
};

DetailedOrderComponent.defaultProps = {
  selectedRoomId: null,
};

export default DetailedOrderComponent;
