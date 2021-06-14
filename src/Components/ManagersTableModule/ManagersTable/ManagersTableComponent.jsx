import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Paper,
  TableCell,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableBody,
  TableFooter,
  Button,
  TablePagination,
  Typography,
} from '@material-ui/core';
import { AddOutlined } from '@material-ui/icons';
import Hotel from '../../../Models/Hotel';
import ManagerRowComponent from '../ManagerRow/ManagerRowComponent';
import AddManagerComponent from '../AddManager/AddManagerComponent';
import User from '../../../Models/User';

const ManagersTableComponent = ({ hotel, users, updateUser }) => {
  const [isCreate, setIsCreate] = useState(false);
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

  const handleCreateClose = () => {
    setIsCreate(!isCreate);
  };

  return (
    <>
      <TableContainer component={Paper} variant="outlined">
        <Table size="small">
          <colgroup>
            <col width="auto" />
            <col width="auto" />
            <col width="auto" />
            <col width="auto" />
            <col width="2.5%" />
          </colgroup>
          <TableHead>
            <TableRow>
              <TableCell>Id</TableCell>
              <TableCell>Surname</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell />
            </TableRow>
          </TableHead>
          <TableBody>
            {hotel.managers ? (
              hotel.managers
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((manager) => (
                  <ManagerRowComponent
                    manager={manager}
                    hotel={hotel}
                    updateUser={updateUser}
                  />
                ))
            ) : (
              <div>No managers for current hotel</div>
            )}
          </TableBody>
          <TableFooter>
            <Button
              color="primary"
              onClick={() => {
                setIsCreate(!isCreate);
              }}
            >
              <AddOutlined />
              <Typography>Add manager</Typography>
            </Button>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              rowsPerPage={rowsPerPage}
              count={hotel.managers.length}
              page={page}
              onChangePage={handleChangePage}
              onChangeRowsPerPage={handleChangePageSize}
            />
          </TableFooter>
        </Table>
      </TableContainer>
      <AddManagerComponent
        open={isCreate}
        close={handleCreateClose}
        updateUser={updateUser}
        hotel={hotel}
        users={users}
      />
    </>
  );
};

ManagersTableComponent.propTypes = {
  hotel: PropTypes.instanceOf(Hotel).isRequired,
  users: PropTypes.instanceOf(User).isRequired,
  updateUser: PropTypes.func.isRequired,
};

export default ManagersTableComponent;
