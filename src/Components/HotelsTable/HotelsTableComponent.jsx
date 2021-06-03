import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  IconButton,
  TableRow,
  TableCell,
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableBody,
  Collapse,
  Box,
  Typography,
  makeStyles,
} from '@material-ui/core';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import Hotel from '../../Models/Hotel';
import Room from '../../Models/Room';
import Service from '../../Models/Service';

const useStyles = makeStyles((theme) => ({
  subrow: {
    display: 'flex',
    alignItems: 'center',
    margin: theme.spacing(0, 5),
  },
}));

const HotelRowMap = ({ hotel }) => {
  return (
    <>
      <TableCell>{hotel.id}</TableCell>
      <TableCell>{hotel.name}</TableCell>
      <TableCell>{hotel.location.country}</TableCell>
      <TableCell>{hotel.location.region}</TableCell>
      <TableCell>{hotel.location.city}</TableCell>
      <TableCell>{`${hotel.location.street}, ${hotel.location.buildingNumber}`}</TableCell>
    </>
  );
};

HotelRowMap.propTypes = {
  hotel: PropTypes.instanceOf(Hotel).isRequired,
};

const HotelRow = ({ hotel }) => {
  const classes = useStyles();

  const [open, setOpen] = useState(false);
  const [openRooms, setOpenRooms] = useState(false);
  const [openServices, setOpenServices] = useState(false);

  return (
    <>
      <TableRow>
        <TableCell>
          <IconButton onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <HotelRowMap hotel={hotel} />
      </TableRow>
      <TableRow>
        <TableCell colSpan={7}>
          <Collapse in={open}>
            <Box>
              <div className={classes.subrow}>
                <IconButton onClick={() => setOpenRooms(!openRooms)}>
                  {openRooms ? (
                    <KeyboardArrowUpIcon />
                  ) : (
                    <KeyboardArrowDownIcon />
                  )}
                </IconButton>
                <Typography variant="h6">Rooms</Typography>
              </div>
              <Collapse in={openRooms}>
                <RoomsTableComponent rooms={hotel.rooms} />
              </Collapse>
            </Box>
            <Box>
              <div className={classes.subrow}>
                <IconButton onClick={() => setOpenServices(!openServices)}>
                  {openServices ? (
                    <KeyboardArrowUpIcon />
                  ) : (
                    <KeyboardArrowDownIcon />
                  )}
                </IconButton>
                <Typography variant="h6">Services</Typography>
              </div>
              <Collapse in={openServices}>
                <ServicesTableComponent services={hotel.services} />
              </Collapse>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
};

HotelRow.propTypes = {
  hotel: PropTypes.instanceOf(Hotel).isRequired,
};

const HotelsTableComponent = ({ hotels }) => {
  return (
    <TableContainer component={Paper} variant="outlined">
      <Table>
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>Id</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Country</TableCell>
            <TableCell>Region</TableCell>
            <TableCell>City</TableCell>
            <TableCell>Street</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {hotels != null ? (
            hotels.map((hotel) => <HotelRow hotel={hotel} key={hotel.id} />)
          ) : (
            <div>Loading</div>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

HotelsTableComponent.propTypes = {
  hotels: PropTypes.arrayOf(Hotel).isRequired,
};

const RoomsTableComponent = ({ rooms }) => {
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Id</TableCell>
          <TableCell>Number</TableCell>
          <TableCell>Floor</TableCell>
          <TableCell>Capacity</TableCell>
          <TableCell>Price</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {rooms != null ? (
          rooms.map((room) => <RoomRow room={room} key={room.id} />)
        ) : (
          <div>Loading</div>
        )}
      </TableBody>
    </Table>
  );
};

RoomsTableComponent.propTypes = {
  rooms: PropTypes.arrayOf(Room).isRequired,
};

const RoomRow = ({ room }) => {
  return (
    <TableRow>
      <RoomRowMap room={room} />
    </TableRow>
  );
};

RoomRow.propTypes = {
  room: PropTypes.instanceOf(Room).isRequired,
};

const RoomRowMap = ({ room }) => {
  return (
    <>
      <TableCell>{room.id}</TableCell>
      <TableCell>{room.roomNumber}</TableCell>
      <TableCell>{room.floorNumber}</TableCell>
      <TableCell>{room.capacity}</TableCell>
      <TableCell>{room.price}</TableCell>
    </>
  );
};

RoomRowMap.propTypes = {
  room: PropTypes.instanceOf(Room).isRequired,
};

const ServicesTableComponent = ({ services }) => {
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Id</TableCell>
          <TableCell>Name</TableCell>
          <TableCell>Price</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {services != null ? (
          services.map((service) => (
            <ServiceRow service={service} key={service.id} />
          ))
        ) : (
          <div>Loading</div>
        )}
      </TableBody>
    </Table>
  );
};

ServicesTableComponent.propTypes = {
  services: PropTypes.arrayOf(Service).isRequired,
};

const ServiceRow = ({ service }) => {
  return (
    <TableRow>
      <ServiceRowMap service={service} />
    </TableRow>
  );
};

ServiceRow.propTypes = {
  service: PropTypes.instanceOf(Service).isRequired,
};

const ServiceRowMap = ({ service }) => {
  return (
    <>
      <TableCell>{service.id}</TableCell>
      <TableCell>{service.name}</TableCell>
      <TableCell>{service.price}</TableCell>
    </>
  );
};

ServiceRowMap.propTypes = {
  service: PropTypes.instanceOf(Service).isRequired,
};

export default HotelsTableComponent;
