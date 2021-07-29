import React from 'react';
import PropTypes from 'prop-types';
import { Autocomplete } from '@material-ui/lab';
import { Grid, TextField, Typography } from '@material-ui/core';
import Service from '../../../Models/Service';
import Room from '../../../Models/Room';

const RoomSelectionComponent = ({
  services,
  rooms,
  onRoomChange,
  onServicesChange,
}) => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant="h6">Select rooms</Typography>
        <Autocomplete
          size="small"
          multiple
          options={rooms}
          getOptionLabel={(room) =>
            `Room #${room.roomNumber}, ${room.capacity} beds ($${room.price})`
          }
          onChange={(event, room) => onRoomChange(room)}
          renderInput={(params) => <TextField {...params} variant="outlined" />}
        />
      </Grid>
      <Grid item xs={12}>
        <Typography variant="h6">Select services</Typography>
        <Autocomplete
          multiple
          limitTags={3}
          size="small"
          options={services}
          getOptionLabel={(service) => `${service.name} ($${service.price})`}
          onChange={onServicesChange}
          renderInput={(params) => (
            <TextField required {...params} variant="outlined" name="service" />
          )}
        />
      </Grid>
    </Grid>
  );
};

RoomSelectionComponent.propTypes = {
  services: PropTypes.arrayOf(Service),
  rooms: PropTypes.arrayOf(Room),
  onRoomChange: PropTypes.func.isRequired,
  onServicesChange: PropTypes.func.isRequired,
};

RoomSelectionComponent.defaultProps = {
  services: [],
  rooms: [],
};

export default RoomSelectionComponent;
