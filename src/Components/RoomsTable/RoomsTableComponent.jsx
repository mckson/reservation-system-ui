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
  Drawer,
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import {
  DeleteOutlined,
  EditOutlined,
  SearchOutlined,
} from '@material-ui/icons';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import Hotel from '../../Models/Hotel';
import Room from '../../Models/Room';
import CreateRoomComponent from './CreateRoomComponent';
import EditRoomComponent from './EditRoomComponent';
import ImagesTable from '../ImagesTableModule/ImagesTable/ImagesTable';

import API from '../../Common/API';
import RoomView from '../../Models/RoomView';
import BaseSearch from '../../Common/BaseSearch/BaseSearch';
import SearchClause from '../../Common/BaseSearch/SearchClause';
import SearchRange from '../../Common/BaseSearch/SearchRange';

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
  searchSection: {
    width: '20%',
    padding: theme.spacing(2),
  },
}));

const RoomsTableComponent = ({
  roomViews,
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
  const [openSearch, setOpenSearch] = useState(false);
  // const [roomNames, setRoomNames] = useState([]);

  const classes = useStyles();

  const [searchClauses, setSearchClauses] = useState([
    new SearchClause('Room name', '', []),
    new SearchClause('Room number', '', []),
    // new SearchClause('Smoking', 'Both', ['Allowed', 'No smoking', 'Both']),
    // new SearchClause('Parking', 'Both', ['Available', 'Unavailable', 'Both']),
    new SearchClause('Facilities', [], [], true),
    new SearchClause('Room views', [], [], true),
  ]);

  const [searchRanges, setSearchRanges] = useState([
    new SearchRange('Floor number', '', '', null, 1, 500),
    new SearchRange('Amount of beds', '', '', null, 1, 15),
    new SearchRange(
      'Appartment area in m2',
      '',
      '',
      (value) => `${value} m2`,
      1,
      1000
    ),
    new SearchRange(
      'Price per night in USD',
      '',
      '',
      (value) => `$${value}`,
      1,
      1000000
    ),
  ]);

  const [searchOptions, setSearchOptions] = useState([]);

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

  const handleChangeSearchClauses = (newClauses) => {
    setSearchClauses(newClauses);
  };

  const handleChangeSearchOptions = (newOptions) => {
    setSearchOptions(newOptions);
  };

  const handleChangeSearchRanges = (newRanges) => {
    setSearchRanges(newRanges);
  };

  const handleSearch = () => {
    setPage(0);
    setRefresh(!refresh);
  };

  useEffect(async () => {
    const response = await API.getRooms(
      page + 1,
      rowsPerPage,
      hotel.id,
      '',
      '',
      searchClauses[0].value,
      searchClauses[1].value,
      searchRanges[0].value[0],
      searchRanges[0].value[1],
      searchRanges[1].value[0],
      searchRanges[1].value[1],
      searchRanges[2].value[0],
      searchRanges[2].value[1],
      searchRanges[3].value[0],
      searchRanges[3].value[1],
      searchClauses[2].value,
      searchClauses[3].value
    );

    if (response) {
      const respondedRooms = response.content.map((item) => new Room(item));

      console.log(respondedRooms);
      setRooms(respondedRooms);
      setTotalCount(response.totalResults);
    }
  }, [page, rowsPerPage, refresh]);

  useEffect(async () => {
    const responseNames = await API.getRoomNames(hotel.id);
    const responseNumbers = await API.getRoomNumbers(hotel.id);

    const newSearchClauses = [...searchClauses];
    newSearchClauses[0] = new SearchClause('Room name', '', responseNames);
    newSearchClauses[1] = new SearchClause(
      'Room number',
      '',
      responseNumbers.map((number) => number.toString())
    );
    setSearchClauses(newSearchClauses);
  }, []);

  return (
    <>
      <Button
        onClick={() => setOpenSearch(true)}
        startIcon={<SearchOutlined />}
      >
        Search options
      </Button>
      <div className={classes.searchSection}>
        <Drawer
          open={openSearch}
          onClose={() => setOpenSearch(false)}
          classes={{ paper: classes.searchSection }}
        >
          <div>
            <BaseSearch
              clauses={searchClauses}
              ranges={searchRanges}
              options={searchOptions}
              onChangeClauses={handleChangeSearchClauses}
              onChangeOptions={handleChangeSearchOptions}
              onChangeRanges={handleChangeSearchRanges}
              onSearch={handleSearch}
            />
          </div>
        </Drawer>
      </div>
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
                    roomViews={roomViews}
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
        roomViews={roomViews}
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
  roomViews: PropTypes.arrayOf(RoomView),
  deleteRoom: PropTypes.func.isRequired,
  updateRoom: PropTypes.func.isRequired,
  createRoom: PropTypes.func.isRequired,
  createRoomImage: PropTypes.func.isRequired,
  deleteRoomImage: PropTypes.func.isRequired,
  onSuccess: PropTypes.func.isRequired,
  onError: PropTypes.func.isRequired,
};

RoomsTableComponent.defaultProps = {
  roomViews: [],
};

const RoomRow = ({
  room,
  hotel,
  roomViews,
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
        roomViews={roomViews}
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
  roomViews: PropTypes.arrayOf(RoomView),
  onRefresh: PropTypes.func.isRequired,
  updateRoom: PropTypes.func.isRequired,
  deleteRoom: PropTypes.func.isRequired,
  createRoomImage: PropTypes.func.isRequired,
  deleteRoomImage: PropTypes.func.isRequired,
  onError: PropTypes.func.isRequired,
  onSuccess: PropTypes.func.isRequired,
};

RoomRow.defaultProps = {
  roomViews: [],
};

const RoomRowMap = ({ room }) => {
  return (
    <>
      <TableCell>{room.id}</TableCell>
      <TableCell>{room.roomNumber}</TableCell>
      <TableCell>{room.floorNumber}</TableCell>
      <TableCell>{room.capacity}</TableCell>
      <TableCell>${room.price}</TableCell>
    </>
  );
};

RoomRowMap.propTypes = {
  room: PropTypes.instanceOf(Room).isRequired,
};

export default RoomsTableComponent;
