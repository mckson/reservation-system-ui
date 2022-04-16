import React from 'react';
import PropTypes from 'prop-types';
import { Box, makeStyles, Typography } from '@material-ui/core';
import Room from '../../../Models/Room';
import Service from '../../../Models/Service';

const convertDate = (dateString) => {
  const date = new Date(dateString);

  return date.toDateString();
};
const computeTotalNights = (dateString1, dateString2) => {
  const date1 = new Date(dateString1);
  const date2 = new Date(dateString2);

  const difference = Math.abs(date2 - date1);

  return difference / (1000 * 3600 * 24);
};

const useStyles = makeStyles((theme) => ({
  content: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  contentWrapper: {
    display: 'flex',
    flexDirection: 'column',
    padding: theme.spacing(2),
    margin: theme.spacing(0, 0, 1, 0),
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: theme.palette.grey[300],
    borderRadius: theme.shape.borderRadius,
  },
  dateDetail: {
    margin: theme.spacing(1, 1, 0, 0),
  },
}));

const countTotalPrice = (rooms, services, deposit, totalNights) => {
  let total = 0;

  rooms.forEach((room) => {
    total += room.price * totalNights;
  });

  services.forEach((service) => {
    total += service.price;
  });

  total += deposit;

  return total;
};

const DetailsComponent = ({
  dateIn,
  dateOut,
  selectedRooms,
  selectedServices,
  customerInfo,
  deposit,
}) => {
  const classes = useStyles();
  return (
    <>
      <Typography variant="h6">Details</Typography>
      <div className={classes.contentWrapper}>
        <div className={classes.content}>
          <Typography component="div" className={classes.dateDetail}>
            <Box>Date-in</Box>
            <Box fontWeight="fontWeightMedium">{convertDate(dateIn)}</Box>
          </Typography>
          <Typography component="div" className={classes.dateDetail}>
            <Box>Date-out</Box>
            <Box fontWeight="fontWeightMedium">{convertDate(dateOut)}</Box>
          </Typography>
        </div>
        <Typography component="div" className={classes.dateDetail}>
          <Box>Total length of stay:</Box>
          <Box fontWeight="fontWeightMedium">
            {computeTotalNights(dateIn, dateOut)} night(-s)
          </Box>
        </Typography>
      </div>

      {selectedRooms && selectedRooms.length !== 0 ? (
        <div className={classes.contentWrapper}>
          <Typography variant="h6">Selected rooms</Typography>

          {selectedRooms.map((room) => (
            <Typography key={room.id} component="div">
              <Box>
                Room #{room.roomNumber}, {room.capacity} bed(-s) (${room.price})
              </Box>
            </Typography>
          ))}
        </div>
      ) : null}

      {selectedServices && selectedServices.length !== 0 ? (
        <div className={classes.contentWrapper}>
          <Typography variant="h6">Selected services</Typography>
          {selectedServices.map((service) => (
            <Typography key={service.id} component="div">
              <Box>
                {service.name} (${service.price})
              </Box>
            </Typography>
          ))}
        </div>
      ) : null}

      {customerInfo ? (
        <div className={classes.contentWrapper}>
          <Typography variant="h6">Customer info</Typography>
          <Typography component="div">
            <Box>
              {customerInfo.firstName} {customerInfo.lastName}
            </Box>
            <Box fontWeight="fontWeightMedium">{customerInfo.email}</Box>
            <Box fontWeight="fontWeightMedium">
              {customerInfo.passportNumber}
            </Box>
            <Box fontWeight="fontWeightMedium">{customerInfo.phoneNumber}</Box>
          </Typography>
        </div>
      ) : null}

      <div className={classes.contentWrapper}>
        <Typography variant="h6">Price summary</Typography>
        {selectedRooms && selectedRooms.length !== 0
          ? selectedRooms.map((room) => (
              <div className={classes.content} key={room.id}>
                <Typography component="div">Room #{room.roomNumber}</Typography>
                <Typography component="div">
                  (${room.price} * {computeTotalNights(dateIn, dateOut)}{' '}
                  night(-s)) ${room.price * computeTotalNights(dateIn, dateOut)}
                </Typography>
              </div>
            ))
          : null}
        {selectedServices && selectedServices.length !== 0
          ? selectedServices.map((service) => (
              <div className={classes.content} key={service.id}>
                <Typography component="div">{service.name}</Typography>
                <Typography component="div">${service.price}</Typography>
              </div>
            ))
          : null}
        {deposit > 0 ? (
          <div className={classes.content}>
            <Typography component="div">Hotel deposit</Typography>
            <Typography component="div">${deposit}</Typography>
          </div>
        ) : null}
        <div className={classes.content}>
          <Typography component="div">
            <Box fontWeight="fontWeightMedium">Total</Box>
          </Typography>
          <Typography component="div">
            <Box fontWeight="fontWeightMedium">
              $
              {countTotalPrice(
                selectedRooms,
                selectedServices,
                deposit,
                computeTotalNights(dateIn, dateOut)
              )}
            </Box>
          </Typography>
        </div>
      </div>
    </>
  );
};

DetailsComponent.propTypes = {
  dateIn: PropTypes.string.isRequired,
  dateOut: PropTypes.string.isRequired,
  selectedRooms: PropTypes.arrayOf(Room),
  selectedServices: PropTypes.arrayOf(Service),
  // eslint-disable-next-line react/forbid-prop-types
  customerInfo: PropTypes.object,
  deposit: PropTypes.number.isRequired,
};

DetailsComponent.defaultProps = {
  selectedRooms: [],
  selectedServices: [],
  customerInfo: null,
};

export default DetailsComponent;
