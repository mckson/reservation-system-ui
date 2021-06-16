import React, { useState } from 'react';
import ArrowBackIcon from '@material-ui/icons/ArrowBackOutlined';
import LocationIcon from '@material-ui/icons/LocationOnOutlined';
import ServicesIcon from '@material-ui/icons/ShoppingCartOutlined';
import {
  Card,
  CardActions,
  CardContent,
  CardHeader,
  IconButton,
  makeStyles,
  Typography,
  Button,
  CardMedia,
  Grid,
} from '@material-ui/core';
import TicketIcon from '@material-ui/icons/ConfirmationNumberOutlined';
import MoneyIcon from '@material-ui/icons/MonetizationOnOutlined';
import RoomIcon from '@material-ui/icons/AirlineSeatIndividualSuiteOutlined';
import PropTypes from 'prop-types';
import { PhotoCameraOutlined, DescriptionOutlined } from '@material-ui/icons';
import Gallery from '../Gallery';
import Hotel from '../../Models/Hotel';
import Default from '../../images/default.png';
import Reservation from '../Reservation';
import User from '../../Models/User';
import SearchBar from '../SearchBar/SearchBar';
import LabeledInfo from './LabeledInfo';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(1, 2),
  },
  rootCard: {
    display: 'flex',
    flexDirection: 'column',
    padding: theme.spacing(0),
    margin: theme.spacing(0),
    width: 'auto',
  },
  actionsTop: {
    flexGrow: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  details: {
    flexGrow: 10,
    height: 'auto',
  },
  media: {
    flexGrow: 3,
    // margin: theme.spacing(0, 0, 5, 0),
  },
  labeledInfo: {
    display: 'flex',
    flexDirection: 'column',
    margin: theme.spacing(0, 0, 5, 0),
  },
  label: {
    display: 'flex',
    alignItems: 'center',
  },
  info: {
    margin: theme.spacing(0),
  },
  desription: {
    margin: theme.spacing(5, 0),
  },
  room: {
    margin: theme.spacing(0, 0, 3, 0),
    padding: theme.spacing(3),
    borderRadius: theme.spacing(1),
    border: `1px solid ${theme.palette.grey[300]}`,
  },
  gallery: {
    // margin: theme.spacing(2, 0, 2),
  },
}));

const HotelFullComponent = ({
  hotel,
  onBackClick,
  loggedUser,
  dateIn,
  dateOut,
  searchHotels,
  onDateInChange,
  onDateOutChange,
}) => {
  const classes = useStyles();
  const [isReservation, setIsReservation] = useState(false);

  const handleReservationClose = () => {
    setIsReservation(false);
  };

  return (
    <div className={classes.root}>
      <Grid container spacing={2}>
        <Grid item sm={12} md={3}>
          <SearchBar
            side
            dateIn={dateIn}
            dateOut={dateOut}
            searchHotels={searchHotels}
            onDateInChange={onDateInChange}
            onDateOutChange={onDateOutChange}
          />
        </Grid>
        <Grid item sm={12} md={9}>
          <Card className={classes.rootCard} variant="outlined">
            <CardActions className={classes.actionsTop}>
              <IconButton
                onClick={onBackClick}
                color="primary"
                aria-label="back to hotels"
              >
                <ArrowBackIcon />
              </IconButton>
              <Button
                onClick={() => setIsReservation(!isReservation)}
                variant="contained"
                color="primary"
                startIcon={<TicketIcon />}
                disabled={
                  dateIn == null ||
                  dateIn === '' ||
                  dateOut == null ||
                  dateOut === ''
                }
              >
                Reserve
              </Button>
            </CardActions>
            <CardHeader
              title={<Typography variant="h4">{hotel.name}</Typography>}
            />
            <CardContent className={classes.details}>
              <CardMedia className={classes.media}>
                <img
                  style={{ width: '50%' }}
                  src={
                    hotel?.mainImage?.image
                      ? `data:image/jpeg;base64,${hotel.mainImage.image}`
                      : Default
                  }
                  alt="hotel"
                />
              </CardMedia>

              {hotel?.images && hotel?.images.length !== 0 ? (
                <LabeledInfo
                  icon={<PhotoCameraOutlined />}
                  labelComponent={<Typography variant="h6">Album</Typography>}
                  infoComponent={
                    <div className={classes.gallery}>
                      <Gallery images={hotel.images} />
                    </div>
                  }
                />
              ) : null}

              <LabeledInfo
                icon={<DescriptionOutlined />}
                labelComponent={
                  <Typography variant="h6">Description</Typography>
                }
                infoComponent={
                  <Typography variant="body1">{hotel.description}</Typography>
                }
              />

              <LabeledInfo
                icon={<LocationIcon />}
                labelComponent={<Typography variant="h6">Location</Typography>}
                infoComponent={
                  <>
                    {' '}
                    <Typography>
                      <b>Country:</b> {hotel.location.country}
                    </Typography>
                    <Typography>
                      <b>Region:</b> {hotel.location.region}
                    </Typography>
                    <Typography>
                      <b>City:</b> {hotel.location.city}
                    </Typography>
                    <Typography>
                      <b>Street:</b> {hotel.location.street},{' '}
                      {hotel.location.buildingNumber}
                    </Typography>
                  </>
                }
              />

              <LabeledInfo
                icon={<MoneyIcon />}
                labelComponent={<Typography variant="h6">Deposit</Typography>}
                infoComponent={
                  <Typography>
                    {hotel.deposit === 0 ? 'None' : hotel.deposit}
                  </Typography>
                }
              />

              {hotel.services.lenght !== 0 ? (
                <LabeledInfo
                  icon={<ServicesIcon />}
                  labelComponent={
                    <Typography variant="h6">Services</Typography>
                  }
                  infoComponent={hotel.services.map((service) => (
                    <Typography key={service.id}>{service.name}</Typography>
                  ))}
                />
              ) : null}

              {hotel.rooms.lenght !== 0 ? (
                <LabeledInfo
                  icon={<RoomIcon />}
                  labelComponent={<Typography variant="h6">Rooms</Typography>}
                  infoComponent={hotel.rooms.map((room) => (
                    <div key={room.id} className={classes.room}>
                      <Typography>
                        <b>Number</b> {room.roomNumber}
                      </Typography>
                      <Typography>
                        <b>Floor</b> {room.floorNumber}
                      </Typography>
                      <Typography>
                        <b>Capacity</b> {room.capacity} sleeps
                      </Typography>
                      <Typography>
                        <b>Price</b> ${room.price}
                      </Typography>
                    </div>
                  ))}
                />
              ) : null}
            </CardContent>
          </Card>
        </Grid>
        <Reservation
          open={isReservation}
          close={handleReservationClose}
          hotel={hotel}
          loggedUser={loggedUser}
          dateIn={dateIn}
          dateOut={dateOut}
        />
      </Grid>
    </div>
  );
};

HotelFullComponent.propTypes = {
  hotel: PropTypes.instanceOf(Hotel).isRequired,
  onBackClick: PropTypes.func.isRequired,
  loggedUser: PropTypes.instanceOf(User),
  dateIn: PropTypes.string,
  dateOut: PropTypes.string,
  searchHotels: PropTypes.func.isRequired,
  onDateInChange: PropTypes.func.isRequired,
  onDateOutChange: PropTypes.func.isRequired,
};

HotelFullComponent.defaultProps = {
  loggedUser: null,
  dateIn: null,
  dateOut: null,
};

export default HotelFullComponent;
