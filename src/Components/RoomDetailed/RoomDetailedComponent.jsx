import React from 'react';
import PropTypes from 'prop-types';
import { Grid } from '@material-ui/core';
import Room from '../../Models/Room';
import Gallery from '../Gallery';

const RoomDetailedComponent = ({ room }) => {
  return (
    <Grid container spacing={1}>
      <Grid item xs={12} md={7}>
        <Gallery images={room.images} />
      </Grid>
      <Grid item xs={12} md={5}>
        {room.roomNumber}
      </Grid>
    </Grid>
  );
};

RoomDetailedComponent.propTypes = {
  room: PropTypes.instanceOf(Room).isRequired,
};

export default RoomDetailedComponent;
