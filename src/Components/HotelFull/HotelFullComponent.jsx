import React from 'react';
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
} from '@material-ui/core';
import TicketIcon from '@material-ui/icons/ConfirmationNumberOutlined';
import MoneyIcon from '@material-ui/icons/MonetizationOnOutlined';
import RoomIcon from '@material-ui/icons/AirlineSeatIndividualSuiteOutlined';
import PropTypes from 'prop-types';
import { PhotoCameraOutlined, DescriptionOutlined } from '@material-ui/icons';
import Gallery from '../Gallery';
import Hotel from '../../Models/Hotel';
import Image from '../../Models/HotelImage';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    padding: theme.spacing(1),
    margin: theme.spacing(0, 5, 3),
    [theme.breakpoints.up('md')]: {
      margin: theme.spacing(0, 10, 3),
    },
    [theme.breakpoints.up('lg')]: {
      margin: theme.spacing(0, 30, 3),
    },
    [theme.breakpoints.up('xl')]: {
      margin: theme.spacing(0, 60, 3),
    },
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
    margin: theme.spacing(0, 0, 5, 0),
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
    margin: theme.spacing(2, 0, 2),
  },
}));

const HotelFullComponent = ({
  hotel,
  onBackClick,
  onReserveClick,
  mainImage,
}) => {
  const classes = useStyles();

  return (
    <>
      <Card className={classes.root} variant="outlined">
        <CardActions className={classes.actionsTop}>
          <IconButton
            onClick={onBackClick}
            color="primary"
            aria-label="back to hotels"
          >
            <ArrowBackIcon />
          </IconButton>
          <Button
            onClick={onReserveClick}
            variant="contained"
            color="primary"
            startIcon={<TicketIcon />}
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
              style={{ width: '100%' }}
              src={`data:image/jpeg;base64,${mainImage.image}`}
              alt="hotel"
            />
          </CardMedia>

          {hotel?.images ? (
            <div className={classes.labeledInfo}>
              <div className={classes.label}>
                <PhotoCameraOutlined />
                <Typography variant="h6">Album</Typography>
              </div>

              <div className={classes.info}>
                <div className={classes.gallery}>
                  <Gallery images={hotel.images} />
                </div>
              </div>
            </div>
          ) : null}

          <div className={classes.labeledInfo}>
            <div className={classes.label}>
              <DescriptionOutlined />
              <Typography variant="h6">Description</Typography>
            </div>
            <div className={classes.info}>
              <Typography variant="body1">{hotel.description}</Typography>
            </div>
          </div>

          <div className={classes.labeledInfo}>
            <div className={classes.label}>
              <LocationIcon />
              <Typography variant="h6">Location</Typography>
            </div>
            <div className={classes.info}>
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
            </div>
          </div>

          <div className={classes.labeledInfo}>
            <div className={classes.label}>
              <MoneyIcon />
              <Typography variant="h6">Deposit</Typography>
            </div>
            <div className={classes.info}>
              <Typography>
                {hotel.deposit === 0 ? 'None' : hotel.deposit}
              </Typography>
            </div>
          </div>

          {hotel.services.lenght !== 0 ? (
            <div className={classes.labeledInfo}>
              <div className={classes.label}>
                <ServicesIcon />
                <Typography variant="h6">Services</Typography>
              </div>
              <div className={classes.info}>
                {hotel.services.map((service) => (
                  <Typography key={service.id}>{service.name}</Typography>
                ))}
              </div>
            </div>
          ) : null}

          {hotel.rooms.lenght !== 0 ? (
            <div className={classes.labeledInfo}>
              <div className={classes.label}>
                <RoomIcon />
                <Typography variant="h6">Rooms</Typography>
              </div>
              <div className={classes.info}>
                {hotel.rooms.map((room) => (
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
              </div>
            </div>
          ) : null}
        </CardContent>
      </Card>
    </>
  );
};

HotelFullComponent.propTypes = {
  hotel: PropTypes.instanceOf(Hotel).isRequired,
  mainImage: PropTypes.instanceOf(Image).isRequired,
  onBackClick: PropTypes.func.isRequired,
  onReserveClick: PropTypes.func.isRequired,
};

export default HotelFullComponent;
