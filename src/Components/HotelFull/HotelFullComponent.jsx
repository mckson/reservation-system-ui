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
import {
  PhotoCameraOutlined,
  DescriptionOutlined,
  InfoOutlined,
} from '@material-ui/icons';
import Gallery from '../Gallery';
import Hotel from '../../Models/Hotel';
import Default from '../../images/default.png';
import Reservation from '../Reservation';
import User from '../../Models/User';
import SearchBar from '../SearchBar/SearchBar';
import LabeledInfo from './LabeledInfo';
import Room from '../../Models/Room';
import ServiceItem from './ServiceItem';
import BaseDialog from '../../Common/BaseDialog';
import RoomDetailed from '../RoomDetailed/RoomDetailed';
import Service from '../../Models/Service';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(1, 5, 1),
    [theme.breakpoints.up('md')]: {
      padding: theme.spacing(1, 10, 1),
    },
    [theme.breakpoints.up('lg')]: {
      padding: theme.spacing(1, 30, 1),
    },
    [theme.breakpoints.up('xl')]: {
      padding: theme.spacing(1, 40, 1),
    },
  },
  grid: {},
  rootCard: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: theme.palette.grey[100],
    borderColor: theme.palette.grey[100],
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
  serviceContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
}));

const HotelFullComponent = ({
  hotel,
  rooms,
  onBackClick,
  loggedUser,
  dateIn,
  dateOut,
  searchHotels,
  onDateInChange,
  onDateOutChange,
  selectedRoomId,
  isRoomDetailedOpen,
  selectedRoomChanged,
  closeRoomDetailed,
  openRoomDetailed,
  onRequestRooms,
}) => {
  const classes = useStyles();
  const [isReservation, setIsReservation] = useState(false);

  const handleReservationClose = () => {
    setIsReservation(false);
  };

  return (
    <div className={classes.root}>
      <Grid container spacing={2} className={classes.grid}>
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
                  src={hotel?.mainImage ? hotel.mainImage : Default}
                  alt="hotel"
                />
              </CardMedia>

              {hotel?.images && hotel?.images.length !== 0 ? (
                <LabeledInfo
                  icon={<PhotoCameraOutlined />}
                  labelComponent={<Typography variant="h6">Album</Typography>}
                >
                  <div className={classes.gallery}>
                    <Gallery images={hotel.images} />
                  </div>
                </LabeledInfo>
              ) : null}

              <LabeledInfo
                icon={<DescriptionOutlined />}
                labelComponent={
                  <Typography variant="h6">Description</Typography>
                }
              >
                <Typography variant="body1">{hotel.description}</Typography>
              </LabeledInfo>

              <LabeledInfo
                icon={<LocationIcon />}
                labelComponent={<Typography variant="h6">Location</Typography>}
              >
                <>
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
              </LabeledInfo>

              <LabeledInfo
                icon={<MoneyIcon />}
                labelComponent={<Typography variant="h6">Deposit</Typography>}
              >
                {' '}
                <Typography>
                  {hotel.deposit === 0 ? 'None' : hotel.deposit}
                </Typography>
              </LabeledInfo>

              {hotel.services.lenght !== 0 ? (
                <LabeledInfo
                  icon={<ServicesIcon />}
                  labelComponent={
                    <Typography variant="h6">Services</Typography>
                  }
                >
                  <div className={classes.serviceContainer}>
                    {hotel.services.map((service) => (
                      <ServiceItem
                        key={service.id}
                        service={new Service(service)}
                      />
                    ))}
                  </div>
                </LabeledInfo>
              ) : null}

              {rooms && rooms.lenght !== 0 ? (
                <LabeledInfo
                  icon={<RoomIcon />}
                  labelComponent={<Typography variant="h6">Rooms</Typography>}
                >
                  {rooms.map((room) => (
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
                      <Button
                        startIcon={<InfoOutlined />}
                        onClick={() => {
                          selectedRoomChanged(room.id);
                          openRoomDetailed();
                        }}
                      >
                        Details
                      </Button>
                    </div>
                  ))}
                </LabeledInfo>
              ) : null}
            </CardContent>
          </Card>
        </Grid>
        <Reservation
          open={isReservation}
          close={handleReservationClose}
          hotel={hotel}
          rooms={rooms}
          loggedUser={loggedUser}
          dateIn={dateIn}
          dateOut={dateOut}
          onRequestRooms={onRequestRooms}
        />
      </Grid>
      {selectedRoomId ? (
        <BaseDialog
          open={isRoomDetailedOpen}
          close={closeRoomDetailed}
          width="md"
          title="Room details"
        >
          <RoomDetailed roomId={selectedRoomId} />
        </BaseDialog>
      ) : null}
    </div>
  );
};

HotelFullComponent.propTypes = {
  hotel: PropTypes.instanceOf(Hotel).isRequired,
  loggedUser: PropTypes.instanceOf(User),
  rooms: PropTypes.arrayOf(Room),
  dateIn: PropTypes.string,
  dateOut: PropTypes.string,
  isRoomDetailedOpen: PropTypes.bool.isRequired,
  selectedRoomId: PropTypes.string,
  searchHotels: PropTypes.func.isRequired,
  onBackClick: PropTypes.func.isRequired,
  onDateInChange: PropTypes.func.isRequired,
  onDateOutChange: PropTypes.func.isRequired,
  onRequestRooms: PropTypes.func.isRequired,
  closeRoomDetailed: PropTypes.func.isRequired,
  selectedRoomChanged: PropTypes.func.isRequired,
  openRoomDetailed: PropTypes.func.isRequired,
};

HotelFullComponent.defaultProps = {
  rooms: [],
  loggedUser: null,
  dateIn: null,
  dateOut: null,
  selectedRoomId: null,
};

export default HotelFullComponent;
