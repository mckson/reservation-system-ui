import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Paper,
  TableRow,
  TableCell,
  TableContainer,
  Table,
  TableBody,
  TableFooter,
  TableHead,
  TablePagination,
  makeStyles,
  TableSortLabel,
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import Hotel from '../../../Models/Hotel';
import CreateHotelComponent from '../Components/CreateHotelComponent';
import HotelRow from '../HotelRow/HotelRow';
import User from '../../../Models/User';
import Constants from '../../../Common/Constants';
import RoomView from '../../../Models/RoomView';
import SearchClause from '../../../Common/BaseSearch/SearchClause';
import SearchRange from '../../../Common/BaseSearch/SearchRange';
import SearchOption from '../../../Common/BaseSearch/SearchOption';
import SearchPanel from '../../../Common/SearchPanel';

const useStyles = makeStyles((theme) => ({
  addButton: {
    margin: theme.spacing(1),
    border: 0,
    borderRadius: '15px',
    height: 40,
    width: 175,
    padding: theme.spacing(1),
    textAlign: 'center',
    textTransform: 'uppercase',
  },
}));

const HotelsTableComponent = ({
  role,
  users,
  hotels,
  roomViews,
  totalCount,
  onSearch,
  prompts,
  clauses,
  ranges,
  options,
  onChangeClauses,
  onChangeRanges,
  onChangeOptions,
  pageChanged,
  pageSizeChanged,
  pageSize,
  deleteHotel,
  updateHotel,
  createHotel,
  createRoom,
  deleteRoom,
  updateRoom,
  createService,
  deleteService,
  updateService,
  updateUser,
  createImage,
  deleteImage,
  createRoomImage,
  deleteRoomImage,
  onError,
  onSuccess,
  onOrderChanged,
  orderBy,
  order,
}) => {
  const classes = useStyles();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowPerPage] = useState(pageSize);
  const [isAdd, setIsAdd] = useState(false);
  const [openSearch, setOpenSearch] = useState(false);

  const headCells = [
    { id: 'id', numeric: false, label: 'Id' },
    { id: 'name', numeric: false, label: 'Name' },
    { id: 'numberFloors', numeric: true, label: 'Floors' },
    { id: 'deposit', numeric: true, label: 'Deposit' },
    { id: 'location.country', numeric: false, label: 'Country' },
    { id: 'location.region', numeric: false, label: 'Region' },
    { id: 'location.city', numeric: false, label: 'City' },
    { id: 'location.street', numeric: false, label: 'Street' },
    { id: 'image', numeric: false, label: 'Image', noOrderBy: true },
  ];

  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === 'asc';

    onOrderChanged({ orderBy: property, order: isAsc ? 'desc' : 'asc' });
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    pageChanged(newPage + 1);
  };

  const handleChangePageSize = (event) => {
    const newSize = parseInt(event.target.value, 10);

    // change request parameters
    pageSizeChanged(newSize);
    pageChanged(1);

    // change table parameters
    setPage(0);
    setRowPerPage(newSize);
  };

  const handleAddClose = () => {
    setIsAdd(false);
  };

  return (
    <>
      <SearchPanel
        open={openSearch}
        onOpen={() => setOpenSearch(true)}
        onClose={() => setOpenSearch(false)}
        title="Setup hotel search options"
        prompts={prompts}
        clauses={clauses}
        ranges={ranges}
        options={options}
        onChangeClauses={onChangeClauses}
        onChangeOptions={onChangeOptions}
        onChangeRanges={onChangeRanges}
        onSearch={onSearch}
      />

      <TableContainer component={Paper} variant="outlined">
        <Table size="small">
          <colgroup>
            <col width="2.5%" />
            <col width="2.5%" />
            <col width="auto" />
            <col width="2.5%" />
            <col width="5%" />
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
            {hotels != null ? (
              hotels.map((hotel) => (
                <HotelRow
                  role={role}
                  users={users}
                  roomViews={roomViews}
                  deleteHotel={deleteHotel}
                  updateHotel={updateHotel}
                  createRoom={createRoom}
                  updateRoom={updateRoom}
                  deleteRoom={deleteRoom}
                  createService={createService}
                  updateService={updateService}
                  deleteService={deleteService}
                  updateUser={updateUser}
                  createImage={createImage}
                  deleteImage={deleteImage}
                  createRoomImage={createRoomImage}
                  deleteRoomImage={deleteRoomImage}
                  hotel={hotel}
                  key={hotel.id}
                  onSuccess={onSuccess}
                  onError={onError}
                />
              ))
            ) : (
              <TableRow>Loading</TableRow>
            )}
          </TableBody>
          <TableFooter className={classes.footer}>
            <TableRow>
              {role === Constants.adminRole ? (
                <TableCell>
                  <Button
                    color="primary"
                    className={classes.addButton}
                    startIcon={<AddIcon />}
                    onClick={() => setIsAdd(!isAdd)}
                  >
                    Add new hotel
                  </Button>
                </TableCell>
              ) : null}
              <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                rowsPerPage={rowsPerPage}
                count={totalCount}
                page={page}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangePageSize}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
      <CreateHotelComponent
        open={isAdd}
        onSuccess={onSuccess}
        close={handleAddClose}
        createHotel={createHotel}
      />
    </>
  );
};

HotelsTableComponent.propTypes = {
  onSearch: PropTypes.func.isRequired,
  clauses: PropTypes.arrayOf(SearchClause),
  ranges: PropTypes.arrayOf(SearchRange),
  options: PropTypes.arrayOf(SearchOption),
  onChangeClauses: PropTypes.func,
  onChangeRanges: PropTypes.func,
  onChangeOptions: PropTypes.func,
  role: PropTypes.string.isRequired,
  users: PropTypes.arrayOf(User).isRequired,
  hotels: PropTypes.arrayOf(Hotel).isRequired,
  roomViews: PropTypes.arrayOf(RoomView),
  totalCount: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  pageChanged: PropTypes.func.isRequired,
  pageSizeChanged: PropTypes.func.isRequired,
  deleteHotel: PropTypes.func.isRequired,
  updateHotel: PropTypes.func.isRequired,
  createHotel: PropTypes.func.isRequired,
  createRoom: PropTypes.func.isRequired,
  updateRoom: PropTypes.func.isRequired,
  deleteRoom: PropTypes.func.isRequired,
  createService: PropTypes.func.isRequired,
  updateService: PropTypes.func.isRequired,
  deleteService: PropTypes.func.isRequired,
  updateUser: PropTypes.func.isRequired,
  createImage: PropTypes.func.isRequired,
  deleteImage: PropTypes.func.isRequired,
  createRoomImage: PropTypes.func.isRequired,
  deleteRoomImage: PropTypes.func.isRequired,
  onError: PropTypes.func.isRequired,
  onSuccess: PropTypes.func.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  prompts: PropTypes.array,
  onOrderChanged: PropTypes.func.isRequired,
  orderBy: PropTypes.string,
  order: PropTypes.string.isRequired,
};

HotelsTableComponent.defaultProps = {
  roomViews: [],
  clauses: [],
  ranges: [],
  options: [],
  prompts: [],
  onChangeClauses: null,
  onChangeRanges: null,
  onChangeOptions: null,
  orderBy: null,
};

export default HotelsTableComponent;
