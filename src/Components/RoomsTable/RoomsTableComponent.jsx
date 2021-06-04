import React from 'react';
import PropTypes from 'prop-types';
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from '@material-ui/core';
import Room from '../../Models/Room';

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

export default RoomsTableComponent;
