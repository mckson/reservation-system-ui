import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Box, Typography, makeStyles } from '@material-ui/core';
import CheckOutlinedIcon from '@material-ui/icons/CheckOutlined';
import Room from '../../Models/Room';
import Carousell from '../../Common/Carousell/Carousell';
import defaultImage from '../../images/default.png';

const useStyles = makeStyles((theme) => ({
  contentGroup: {
    display: 'flex',
    flexDirection: 'column',
    margin: theme.spacing(0, 0, 1, 0),
  },
  content: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  contentItem: {
    display: 'flex',
    alignItems: 'center',
  },
  subtitle: {
    fontSize: theme.typography.h6,
    fontWeight: theme.typography.fontWeightBold,
  },
}));

const RoomDetailedComponent = ({ room }) => {
  const classes = useStyles();
  const isRoomImagesNonEmpty = room?.images && room?.images.length > 0;
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={7}>
        <Carousell
          imagesUrls={
            isRoomImagesNonEmpty ? room.images : new Array(defaultImage)
          }
          altText="Room Image"
        />
      </Grid>
      <Grid container item xs={12} md={5} alignContent="flex-start">
        <Grid item xs={12} className={classes.contentGroup}>
          <Typography variant="h6">
            {room.name ? room.name : `Room #${room.roomNumber}`}
          </Typography>
        </Grid>
        {room.description ? (
          <Grid item xs={12} className={classes.contentGroup}>
            <Typography variant="body1">{room.description}</Typography>
          </Grid>
        ) : null}
        <Grid item xs={12} className={classes.contentGroup}>
          <Typography component="div" className={classes.content}>
            <Box>Room number</Box>
            <Box>{room.roomNumber}</Box>
          </Typography>
          <Typography component="div" className={classes.content}>
            <Box>Floor</Box>
            <Box>{room.floorNumber}</Box>
          </Typography>
          <Typography component="div" className={classes.content}>
            <Box>Beds</Box>
            <Box>{room.capacity}</Box>
          </Typography>
          <Typography component="div" className={classes.content}>
            <Box>Appartment Size</Box>
            <Box>
              {room.area} m<sup>2</sup>
            </Box>
          </Typography>
        </Grid>
        {room.views && room.views.length > 0 ? (
          <Grid item xs={12} className={classes.contentGroup}>
            <Typography>
              <Box className={classes.subtitle}>View</Box>
            </Typography>
            <Typography component="div" className={classes.content}>
              <Grid container spacing={0}>
                {room.views.map((view) => (
                  <Grid item xs={6} key={view.id}>
                    <div className={classes.contentItem}>
                      <CheckOutlinedIcon fontSize="small" />
                      {view.name}
                    </div>
                  </Grid>
                ))}
              </Grid>
            </Typography>
          </Grid>
        ) : null}
        {room.facilities && room.facilities.length > 0 ? (
          <Grid item xs={12} className={classes.contentGroup}>
            <Typography>
              <Box className={classes.subtitle}>Apartment Facilities</Box>
            </Typography>
            <Typography component="div" className={classes.content}>
              <Grid container spacing={0}>
                {room.facilities.map((facility) => (
                  <Grid item xs={6} key={facility.id}>
                    <div className={classes.contentItem}>
                      <CheckOutlinedIcon fontSize="small" />
                      {facility.name}
                    </div>
                  </Grid>
                ))}
              </Grid>
            </Typography>
          </Grid>
        ) : null}
        <Grid item xs={12} className={classes.contentGroup}>
          <Typography component="div" className={classes.content}>
            <Box>Smoking</Box>
            <Box>{room.smoking ? 'Allowed' : 'No smoking'}</Box>
          </Typography>
          <Typography component="div" className={classes.content}>
            <Box>Parking</Box>
            <Box>{room.parking ? 'Availavle' : 'No parking available'}</Box>
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  );
};

RoomDetailedComponent.propTypes = {
  room: PropTypes.instanceOf(Room).isRequired,
};

export default RoomDetailedComponent;
