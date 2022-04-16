import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableSortLabel,
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
  Checkbox,
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
import RoomView from '../../Models/RoomView';
import SearchClause from '../../Common/BaseSearch/SearchClause';
import SearchRange from '../../Common/BaseSearch/SearchRange';
import SearchOption from '../../Common/BaseSearch/SearchOption';
import RoomRequests from '../../api/RoomRequests';
import SearchPanel from '../../Common/SearchPanel';

const { getRooms, getRoomSearchVariants } = RoomRequests;

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
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState(null);
  const [rooms, setRooms] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowPerPage] = useState(10);
  const [totalCount, setTotalCount] = useState(0);
  const [refresh, setRefresh] = useState(false);
  const [openSearch, setOpenSearch] = useState(false);
  const [searchVariants, setSearchVariants] = useState([]);

  const classes = useStyles();

  const [searchClauses, setSearchClauses] = useState([
    new SearchClause({
      name: 'Room name',
      value: '',
      getOptionValue: (option) => option.name,
      optionsMap: (options) => [
        ...new Set(
          options.map((option) => option.name).filter((option) => option)
        ),
      ],
    }),
    new SearchClause({
      name: 'Room number',
      value: '',
      getOptionLabel: (option) => `#${option.number}`,
      getOptionValue: (option) => option.number,
    }),
    new SearchClause({
      name: 'Facilities',
      value: [],
      multiple: true,
      noOptions: true,
    }),
    new SearchClause({
      name: 'Room views',
      value: [],
      multiple: true,
      noOptions: true,
    }),
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

  const headCells = [
    { id: 'id', numeric: false, label: 'Id' },
    { id: 'name', numeric: false, label: 'Name' },
    { id: 'roomNumber', numeric: true, label: 'Number' },
    { id: 'floorNumber', numeric: true, label: 'Floor' },
    { id: 'capacity', numeric: true, label: 'Beds' },
    { id: 'price', numeric: false, label: 'Price' },
    { id: 'area', numeric: true, label: 'Area' },
    { id: 'smoking', numeric: false, label: 'Smoking' },
    { id: 'parking', numeric: false, label: 'Parking' },
  ];

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
    const response = await getRooms({
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
      facilities: searchClauses[2].value.map((value) => value),
      roomViews: searchClauses[3].value.map((value) => value),
      propertyName: orderBy,
      isDescending: order === 'desc',
    });

    if (response) {
      const respondedRooms = response.content.map((item) => new Room(item));

      setRooms(respondedRooms);
      setTotalCount(response.totalResults);
    }
  }, [page, rowsPerPage, refresh]);

  const requestSearchVariants = async () => {
    const response = await getRoomSearchVariants({
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
      facilities: searchClauses[2].value.map((value) => value),
      roomViews: searchClauses[3].value.map((value) => value),
    });

    setSearchVariants(response);
  };

  const handleOrderChanged = (newOrder) => {
    setOrderBy(newOrder.orderBy);
    setOrder(newOrder.order);
    setPage(1);
    setRefresh(!refresh);
  };

  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === 'asc';

    handleOrderChanged({ orderBy: property, order: isAsc ? 'desc' : 'asc' });
  };

  useEffect(async () => {
    if (searchClauses[0].value || searchClauses[1].value) {
      await requestSearchVariants();
    } else {
      setSearchVariants([]);
    }
  }, [searchClauses, searchRanges]);

  return (
    <>
      <SearchPanel
        open={openSearch}
        onOpen={() => setOpenSearch(true)}
        onClose={() => setOpenSearch(false)}
        title="Setup room search options"
        prompts={searchVariants}
        clauses={searchClauses}
        ranges={searchRanges}
        options={searchOptions}
        onChangeClauses={handleChangeSearchClauses}
        onChangeOptions={handleChangeSearchOptions}
        onChangeRanges={handleChangeSearchRanges}
        onSearch={handleSearch}
      />
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
              {headCells.map((headCell) => (
                <TableCell
                  key={headCell.id}
                  align={headCell.numeric ? 'right' : 'left'}
                  sortDirection={orderBy === headCell.id ? order : 'asc'}
                >
                  {headCell.noOrderBy ? (
                    headCell.label
                  ) : (
                    <TableSortLabel
                      active={orderBy === headCell.id}
                      direction={orderBy === headCell.id ? order : 'asc'}
                      onClick={() => {
                        handleRequestSort(headCell.id);
                      }}
                    >
                      {headCell.label}
                    </TableSortLabel>
                  )}
                </TableCell>
              ))}
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
  hotel: PropTypes.instanceOf(Hotel).isRequired,
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
      <TableCell align="right">{room.roomNumber}</TableCell>
      <TableCell align="right">{room.floorNumber}</TableCell>
      <TableCell align="right">{room.capacity}</TableCell>
      <TableCell align="right">${room.price}</TableCell>
      <TableCell align="right">
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
