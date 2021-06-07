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
import Gallery from '../Gallery';
import Hotel from '../../Models/Hotel';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    padding: theme.spacing(1),
  },
  actionsTop: {
    flexGrow: 1,
    height: 'auto',
  },
  details: {
    flexGrow: 10,
    height: 'auto',
  },
  labeledInfo: {
    display: 'flex',
    margin: theme.spacing(0, 0, 5, 0),
  },
  label: {
    display: 'flex',
    alignItems: 'baseline',
  },
  info: {
    margin: theme.spacing(0, 5),
  },
  gallery: {
    margin: theme.spacing(0),
    backgroundColor: '#d7e4fa',
    display: 'flex',
    flexDirection: 'row',
  },
  desription: {
    margin: theme.spacing(5, 0),
  },
  image: {
    flexGrow: 1,
    display: 'block',
    height: '300px',
    width: 'auto',
  },
  room: {
    margin: theme.spacing(0, 0, 3, 0),
    padding: theme.spacing(3),
    borderRadius: theme.spacing(1),
    border: '1px solid black',
  },
}));

const HotelFullComponent = ({ hotel, onBackClick, onReserveClick, images }) => {
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
          <CardMedia>
            <Gallery imageUrls={images} />
          </CardMedia>

          <div className={classes.desription}>
            <Typography variant="body2">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean
              mattis, ante vitae ultrices posuere, justo quam auctor magna, in
              pulvinar nibh magna ut sapien. Pellentesque vehicula turpis non
              augue faucibus, vitae dictum diam dignissim. Morbi id laoreet
              purus, non suscipit tortor. Vivamus lacus nisi, luctus ut dictum
              sit amet, semper eu risus. Suspendisse eget purus non ex vehicula
              fringilla. Vivamus id quam vel felis aliquet pharetra non nec
              nibh. Sed imperdiet odio orci, sit amet semper nibh pellentesque
              vitae. Aliquam pellentesque ex quis nisl ornare, eu volutpat erat
              varius.Aliquam lobortis quis enim eu laoreet. Fusce vel massa at
              lorem gravida tempus quis vitae enim. Suspendisse vehicula, urna
              egestas interdum consectetur, dui lectus luctus arcu, id finibus
              ante libero in urna. Nunc auctor mi quis dui placerat dictum.
              Praesent quis lorem in leo aliquet tempus. Sed dui urna, pulvinar
              ut turpis ullamcorper, auctor feugiat arcu. Phasellus eu facilisis
              nisi. Etiam lobortis risus a arcu rhoncus ultricies. Integer
              laoreet magna sed pulvinar vestibulum. Vestibulum felis nisl,
              viverra pulvinar diam in, congue cursus leo. Etiam pretium, enim
              at tristique egestas, lorem nibh tempor odio, ac mollis nunc quam
              quis erat. Maecenas urna augue, maximus ut tortor vitae, molestie
              pellentesque quam. Mauris tellus quam, elementum at eros eu,
              luctus tincidunt mauris. Curabitur condimentum sem sed metus
              malesuada lobortis. Proin vehicula ut enim id vestibulum. Cras
              quam purus, congue ac commodo a, facilisis condimentum nunc. Proin
              lobortis sed nisi ut interdum. Sed purus dolor, aliquet eget nunc
              in, fringilla vestibulum diam. Proin sed lacinia neque. Nam augue
              enim, elementum nec congue quis, facilisis ut neque.
            </Typography>
          </div>

          <div className={classes.labeledInfo}>
            <div className={classes.label}>
              <LocationIcon />
              <Typography variant="h6">Location</Typography>
            </div>
            <div className={classes.info}>
              <Typography>
                <b>Country</b> {hotel.location.country}
              </Typography>
              <Typography>
                <b>Region</b> {hotel.location.region}
              </Typography>
              <Typography>
                <b>City</b> {hotel.location.city}
              </Typography>
              <Typography>
                <b>Street</b> {hotel.location.street},{' '}
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
                  <div className={classes.room}>
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
  // eslint-disable-next-line react/forbid-prop-types
  images: PropTypes.array.isRequired,
  onBackClick: PropTypes.func.isRequired,
  onReserveClick: PropTypes.func.isRequired,
};

export default HotelFullComponent;
