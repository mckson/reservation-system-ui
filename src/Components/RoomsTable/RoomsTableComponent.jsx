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
  makeStyles,
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import { DeleteOutlined, EditOutlined } from '@material-ui/icons';
import Hotel from '../../Models/Hotel';
import Room from '../../Models/Room';
import CreateRoomComponent from './CreateRoomComponent';
import EditRoomComponent from './EditRoomComponent';

const RoomsTableComponent = ({
  rooms,
  createRoom,
  updateRoom,
  deleteRoom,
  hotel,
}) => {
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
        <Table size="small">
          <colgroup>
            <col width="2.5%" />
            <col width="auto" />
            <col width="auto" />
            <col width="auto" />
            <col width="auto" />
            <col width="2.5%" />
          </colgroup>
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
                .map((room) => (
                  <RoomRow
                    room={room}
                    key={room.id}
                    updateRoom={updateRoom}
                    deleteRoom={deleteRoom}
                    hotel={hotel}
                  />
                ))
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
  deleteRoom: PropTypes.func.isRequired,
  updateRoom: PropTypes.func.isRequired,
  createRoom: PropTypes.func.isRequired,
};

const useStyles = makeStyles((theme) => ({
  button: {
    margin: 0,
    color: theme.palette.primary.main,
  },
  actions: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: 'auto',
  },
}));

const RoomRow = ({ room, hotel, updateRoom, deleteRoom }) => {
  const classes = useStyles();

  const [isEdit, setIsEdit] = useState(false);

  const handleEditClose = () => {
    setIsEdit(false);
  };

  return (
    <>
      <TableRow>
        <RoomRowMap room={room} />
        <TableCell className={classes.actions}>
          <IconButton
            className={classes.button}
            onClick={() => setIsEdit(!isEdit)}
          >
            <EditOutlined />
          </IconButton>
          <IconButton
            className={classes.button}
            onClick={() => deleteRoom(room.id)}
          >
            <DeleteOutlined />
          </IconButton>
        </TableCell>
      </TableRow>
      <EditRoomComponent
        room={room}
        open={isEdit}
        close={handleEditClose}
        hotel={hotel}
        updateRoom={updateRoom}
      />
    </>
  );
};

RoomRow.propTypes = {
  room: PropTypes.instanceOf(Room).isRequired,
  hotel: PropTypes.instanceOf(Hotel).isRequired,
  updateRoom: PropTypes.func.isRequired,
  deleteRoom: PropTypes.func.isRequired,
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
