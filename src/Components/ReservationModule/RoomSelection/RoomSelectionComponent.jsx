import React from 'react';
import PropTypes from 'prop-types';
// import { Formik, Form /* , Field */ } from 'formik';
import { Autocomplete } from '@material-ui/lab';
import { Grid, TextField, Typography } from '@material-ui/core';

import Hotel from '../../../Models/Hotel';
// import MyTextField from '../../../Common/MyTextField';
// import SmallHotelCard from '../../SmallHotelCard';

const RoomSelectionComponent = ({ hotel, onRoomChange, onServicesChange }) => {
  // const [selectedRoom, setSelectedRoom] = useState({});
  // const [selectedServices, setSelectedServices] = useState([]);

  // const onRoomChange = (event, room) => {
  //   setSelectedRoom(room);
  // };

  // const onServicesChange = (event, services) => {
  //   setSelectedServices(services);
  // };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant="h6">Select rooms</Typography>
        <Autocomplete
          size="small"
          multiple
          options={hotel.rooms}
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
          options={hotel.services}
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
  hotel: PropTypes.instanceOf(Hotel).isRequired,
  onRoomChange: PropTypes.func.isRequired,
  onServicesChange: PropTypes.func.isRequired,
};

export default RoomSelectionComponent;
