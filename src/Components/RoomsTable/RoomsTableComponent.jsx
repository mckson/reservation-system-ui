import React, { useState, useEffect } from 'react';
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
  Paper,
  Typography,
  IconButton,
  makeStyles,
  Collapse,
  Box,
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import { DeleteOutlined, EditOutlined } from '@material-ui/icons';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import Hotel from '../../Models/Hotel';
import Room from '../../Models/Room';
import CreateRoomComponent from './CreateRoomComponent';
import EditRoomComponent from './EditRoomComponent';
import ImagesTable from '../ImagesTableModule/ImagesTable/ImagesTable';

import API from '../../Common/API';

const useStyles = makeStyles((theme) => ({
  button: {
    margin: 0,
    color: theme.palette.primary.main,
    height: 40,
  },
  addButton: {
    margin: theme.spacing(1),
    border: 0,
    borderRadius: '15px',
    height: 40,
    width: 150,
    padding: theme.spacing(1),
    textAlign: 'center',
    textTransform: 'uppercase',
  },
  actions: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: 'auto',
  },
  row: {
    '& > *': {
      borderBottom: 'unset',
    },
    background: theme.palette.background.paper,
    // '&.Mui-selected': { background: theme.palette.grey[400] },
    // '&.Mui-selected:hover': { background: theme.palette.grey[300] },
  },
  subrowTitle: {
    display: 'flex',
    alignItems: 'center',
  },
  subrow: {
    margin: theme.spacing(0, 5),
    display: 'flex',
    flexDirection: 'column',
    width: 'auto',
  },
}));

const RoomsTableComponent = ({
  createRoom,
  updateRoom,
  deleteRoom,
  createRoomImage,
  deleteRoomImage,
  hotel,
  onSuccess,
  onError,
}) => {
  const [isAdd, setIsAdd] = useState(false);
  const [rooms, setRooms] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowPerPage] = useState(10);
  const [totalCount, setTotalCount] = useState(0);
  const [refresh, setRefresh] = useState(false);

  const classes = useStyles();

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

  const handleRefresh = () => {
    setRefresh(!refresh);
  };

  useEffect(async () => {
    const response = await API.getRooms(
      page + 1,
      rowsPerPage,
      hotel.id,
      '',
      ''
    );

    if (response) {
      const respondedRooms = response.content.map((item) => new Room(item));

      setRooms(respondedRooms);
      setTotalCount(response.totalResults);
    }
  }, [page, rowsPerPage, refresh]);

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
            <col width="auto" />
            <col width="2.5%" />
          </colgroup>
          <TableHead>
            <TableRow>
              <TableCell />
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
                // .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((room) => (
                  <RoomRow
                    room={room}
                    onRefresh={handleRefresh}
                    key={room.id}
                    updateRoom={updateRoom}
                    deleteRoom={deleteRoom}
                    createRoomImage={createRoomImage}
                    deleteRoomImage={deleteRoomImage}
                    hotel={hotel}
                    onError={onError}
                    onSuccess={onSuccess}
                  />
                ))
            ) : (
              <div>Loading</div>
            )}
          </TableBody>
          <TableFooter>
            <Button
              color="primary"
              className={classes.addButton}
              onClick={() => setIsAdd(!isAdd)}
              startIcon={<AddIcon />}
            >
              Add new room
            </Button>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              rowsPerPage={rowsPerPage}
              count={totalCount}
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
        onRefresh={handleRefresh}
        createRoom={createRoom}
        hotel={hotel}
        onSuccess={onSuccess}
      />
    </>
  );
};

RoomsTableComponent.propTypes = {
  // rooms: PropTypes.arrayOf(Room).isRequired,
  hotel: PropTypes.instanceOf(Hotel).isRequired,
  // totalCount: PropTypes.number.isRequired,
  // pageSize: PropTypes.number.isRequired,
  deleteRoom: PropTypes.func.isRequired,
  updateRoom: PropTypes.func.isRequired,
  createRoom: PropTypes.func.isRequired,
  createRoomImage: PropTypes.func.isRequired,
  deleteRoomImage: PropTypes.func.isRequired,
  onSuccess: PropTypes.func.isRequired,
  onError: PropTypes.func.isRequired,
};

const RoomRow = ({
  room,
  hotel,
  onRefresh,
  updateRoom,
  deleteRoom,
  createRoomImage,
  deleteRoomImage,
  onError,
  onSuccess,
}) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [openImages, setOpenImages] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  const handleEditClose = () => {
    setIsEdit(false);
  };

  return (
    <>
      <TableRow className={classes.row}>
        <TableCell>
          <IconButton onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
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
            onClick={async () => {
              const [roomResponse, errorResponse] = await deleteRoom(room.id);

              if (errorResponse) {
                onError(errorResponse);
              } else {
                onSuccess(
                  `Room ${roomResponse.roomNumber} successfully deleted`
                );
                onRefresh();
              }
            }}
          >
            <DeleteOutlined />
          </IconButton>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell
          style={{
            paddingBottom: 0,
            paddingTop: 0,
          }}
          colSpan={7}
        >
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box>
              <div className={classes.subrow}>
                <div className={classes.subrowTitle}>
                  <IconButton
                    onClick={() => {
                      setOpenImages(!openImages);
                    }}
                  >
                    {openImages ? (
                      <KeyboardArrowUpIcon />
                    ) : (
                      <KeyboardArrowDownIcon />
                    )}
                  </IconButton>
                  <Typography variant="h6">Images</Typography>
                </div>
                <Collapse in={openImages} className={classes.table}>
                  <ImagesTable
                    hotelId={hotel.id}
                    roomId={room.id}
                    images={room.images}
                    deleteImage={deleteRoomImage}
                    createImage={createRoomImage}
                    onSuccess={onSuccess}
                    onError={onError}
                  />
                </Collapse>
              </div>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
      <EditRoomComponent
        room={room}
        open={isEdit}
        onRefresh={onRefresh}
        close={handleEditClose}
        hotel={hotel}
        updateRoom={updateRoom}
        onSuccess={onSuccess}
      />
    </>
  );
};

RoomRow.propTypes = {
  room: PropTypes.instanceOf(Room).isRequired,
  hotel: PropTypes.instanceOf(Hotel).isRequired,
  onRefresh: PropTypes.func.isRequired,
  updateRoom: PropTypes.func.isRequired,
  deleteRoom: PropTypes.func.isRequired,
  createRoomImage: PropTypes.func.isRequired,
  deleteRoomImage: PropTypes.func.isRequired,
  onError: PropTypes.func.isRequired,
  onSuccess: PropTypes.func.isRequired,
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
