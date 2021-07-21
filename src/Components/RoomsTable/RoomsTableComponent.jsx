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
  Checkbox,
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
import SearchOption from '../../Common/BaseSearch/SearchOption';

const useStyles = makeStyles((theme) => ({
  button: {
    color: theme.palette.primary.main,
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
    width: `calc('100%'-${theme.spacing(2)})`,
    padding: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      width: '40%',
    },
    [theme.breakpoints.up('md')]: {
      width: '30%',
    },
    [theme.breakpoints.up('lg')]: {
      width: '20%',
    },
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

  const classes = useStyles();

  const [searchClauses, setSearchClauses] = useState([
    new SearchClause('Room name', '', []),
    new SearchClause('Room number', '', []),
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

  const [searchOptions, setSearchOptions] = useState([
    new SearchOption('Allowed smoking', false),
    new SearchOption('Parking', false),
  ]);

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
    const response = await API.getRooms({
      pageNumber: page + 1,
      pageSize: rowsPerPage,
      hotelId: hotel.id,
      name: searchClauses[0].value,
      number: searchClauses[1].value,
      minFloorNumber: searchRanges[0].value[0],
      maxFloorNumber: searchRanges[0].value[1],
      minCapacity: searchRanges[1].value[0],
      maxCapacity: searchRanges[1].value[1],
      minArea: searchRanges[2].value[0],
      maxArea: searchRanges[2].value[1],
      minPrice: searchRanges[3].value[0],
      maxPrice: searchRanges[3].value[1],
      smoking: searchOptions[0].value,
      parking: searchOptions[1].value,
      facilities: searchClauses[2].value,
      roomViews: searchClauses[3].value,
    });

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
        Setup room search options
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
            <col width="auto" />
            <col width="auto" />
            <col width="1%" />
          </colgroup>
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell>Id</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Number</TableCell>
              <TableCell>Floor</TableCell>
              <TableCell>Beds</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Area</TableCell>
              <TableCell>Smoking</TableCell>
              <TableCell>Parking</TableCell>
              <TableCell />
            </TableRow>
          </TableHead>
          <TableBody>
            {rooms != null ? (
              rooms.map((room) => (
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
          colSpan={11}
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
      <TableCell>{room.name}</TableCell>
      <TableCell>{room.roomNumber}</TableCell>
      <TableCell>{room.floorNumber}</TableCell>
      <TableCell>{room.capacity}</TableCell>
      <TableCell>${room.price}</TableCell>
      <TableCell>
        {room.area} m<sup>2</sup>
      </TableCell>
      <TableCell>
        <Checkbox checked={room.smoking} readOnly color="primary" />
      </TableCell>
      <TableCell>
        <Checkbox checked={room.parking} readOnly color="primary" />
      </TableCell>
    </>
  );
};

RoomRowMap.propTypes = {
  room: PropTypes.instanceOf(Room).isRequired,
};

export default RoomsTableComponent;
