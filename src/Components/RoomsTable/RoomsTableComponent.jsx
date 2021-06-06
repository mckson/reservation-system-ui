import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableFooter,
  TablePagination,
  TableContainer,
  Button,
  Typography,
  Paper,
  IconButton,
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import { DeleteOutlined, EditOutlined } from '@material-ui/icons';
import Hotel from '../../Models/Hotel';
import Room from '../../Models/Room';
import CreateRoomComponent from './CreateRoomComponent';

const RoomsTableComponent = ({ rooms, createRoom, hotel }) => {
  const [isAdd, setIsAdd] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangePageSize = (event) => {
    const newSize = parseInt(event.target.value, 10);
    setPage(0);
    setRowPerPage(newSize);
  };

  const handleAddClose = () => {
    setIsAdd(!isAdd);
  };

  return (
    <>
      <TableContainer component={Paper} variant="outlined">
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Id</TableCell>
              <TableCell>Number</TableCell>
              <TableCell>Floor</TableCell>
              <TableCell>Capacity</TableCell>
              <TableCell>Price</TableCell>
              <TableCell />
            </TableRow>
          </TableHead>
          <TableBody>
            {rooms != null ? (
              rooms
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((room) => <RoomRow room={room} key={room.id} />)
            ) : (
              <div>Loading</div>
            )}
          </TableBody>
          <TableFooter>
            <Button color="primary" onClick={() => setIsAdd(!isAdd)}>
              <AddIcon />
              <Typography>Add new room</Typography>
            </Button>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              rowsPerPage={rowsPerPage}
              count={rooms.length}
              page={page}
              onChangePage={handleChangePage}
              onChangeRowsPerPage={handleChangePageSize}
            />
          </TableFooter>
        </Table>
      </TableContainer>
      <CreateRoomComponent
        open={isAdd}
        close={handleAddClose}
        createRoom={createRoom}
        hotel={hotel}
      />
    </>
  );
};

RoomsTableComponent.propTypes = {
  rooms: PropTypes.arrayOf(Room).isRequired,
  hotel: PropTypes.instanceOf(Hotel).isRequired,
  // totalCount: PropTypes.number.isRequired,
  // pageSize: PropTypes.number.isRequired,
  // deleteRoom: PropTypes.func.isRequired,
  // updateRoom: PropTypes.func.isRequired,
  createRoom: PropTypes.func.isRequired,
};

const RoomRow = ({ room }) => {
  return (
    <TableRow>
      <RoomRowMap room={room} />
      <TableCell>
        <IconButton>
          <EditOutlined />
        </IconButton>
        <IconButton>
          <DeleteOutlined />
        </IconButton>
      </TableCell>
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
