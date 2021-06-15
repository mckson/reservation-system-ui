import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  TableRow,
  TableCell,
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableBody,
  makeStyles,
  TableFooter,
  TablePagination,
  Button,
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import Hotel from '../../../Models/Hotel';
import CreateHotelComponent from '../Components/CreateHotelComponent';
import HotelRow from '../HotelRow/HotelRow';
import User from '../../../Models/User';
import Constants from '../../../Common/Constants';

const useStyles = makeStyles((theme) => ({
  button: {
    margin: 0,
    color: theme.palette.primary.main,
  },
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
  footer: {},
}));

const HotelsTableComponent = ({
  role,
  users,
  hotels,
  totalCount,
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
  onError,
  onSuccess,
}) => {
  const classes = useStyles();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowPerPage] = useState(pageSize);
  const [isAdd, setIsAdd] = useState(false);

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

  const handleAddClose = (message) => {
    setIsAdd(!isAdd);
    console.log(message);
  };

  return (
    <>
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
              <TableCell>Id</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Floors</TableCell>
              <TableCell>Deposit</TableCell>
              <TableCell>Country</TableCell>
              <TableCell>Region</TableCell>
              <TableCell>City</TableCell>
              <TableCell>Street</TableCell>
              <TableCell>Picture</TableCell>
              <TableCell />
            </TableRow>
          </TableHead>
          <TableBody>
            {hotels != null ? (
              hotels.map((hotel) => (
                <HotelRow
                  role={role}
                  users={users}
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
                  hotel={hotel}
                  key={hotel.id}
                  onSuccess={onSuccess}
                  onError={onError}
                />
              ))
            ) : (
              <div>Loading</div>
            )}
          </TableBody>
          <TableFooter className={classes.footer}>
            {role === Constants.adminRole ? (
              <Button
                color="primary"
                className={classes.addButton}
                startIcon={<AddIcon />}
                onClick={() => setIsAdd(!isAdd)}
              >
                Add new hotel
              </Button>
            ) : null}
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
  role: PropTypes.string.isRequired,
  users: PropTypes.arrayOf(User).isRequired,
  hotels: PropTypes.arrayOf(Hotel).isRequired,
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
  onError: PropTypes.func.isRequired,
  onSuccess: PropTypes.func.isRequired,
};

export default HotelsTableComponent;
