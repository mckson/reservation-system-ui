import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TablePagination,
  TableRow,
  makeStyles,
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import User from '../../../Models/User';
import UserRow from '../UserRow/UserRow';
import CreateUserComponent from '../CreateUserComponent';
import HotelBrief from '../../../Models/HotelBrief';
import SearchUsers from '../SearchUsers/SearchUsers';
import UserBrief from '../../../Models/UserBrief';

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
  search: {
    margin: theme.spacing(0, 0, 2, 0),
  },
}));

const UsersTableComponent = ({
  users,
  usersBrief,
  onChangeSearchClauses,
  hotels,
  totalCount,
  pageChanged,
  pageSizeChanged,
  pageSize,
  createUser,
  updateUser,
  deleteUser,
  onError,
  onSuccess,
}) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowPerPage] = useState(pageSize);
  const [isAdd, setIsAdd] = useState(false);

  const classes = useStyles();

  const handleChangePage = (event, newPage) => {
    // eslint-disable-next-line no-debugger
    debugger;
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
      <div className={classes.search}>
        <SearchUsers
          users={usersBrief}
          onChangeSearchClauses={onChangeSearchClauses}
        />
      </div>
      <TableContainer component={Paper} variant="outlined">
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Id</TableCell>
              <TableCell>Surname</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Nickname</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Date of birth</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>Roles</TableCell>
              <TableCell />
            </TableRow>
          </TableHead>
          <TableBody>
            {users ? (
              users.map((user) => (
                <UserRow
                  key={user.id}
                  hotels={hotels}
                  user={new User(user)}
                  createUser={createUser}
                  updateUser={updateUser}
                  deleteUser={deleteUser}
                  onSuccess={onSuccess}
                  onError={onError}
                />
              ))
            ) : (
              <div>No users</div>
            )}
          </TableBody>
          <TableFooter>
            <Button
              color="primary"
              startIcon={<AddIcon />}
              onClick={() => setIsAdd(!isAdd)}
              className={classes.addButton}
            >
              Add new user
            </Button>
            <TablePagination
              rowsPerPageOptions={[5, 10, 15]}
              rowsPerPage={rowsPerPage}
              count={totalCount}
              page={page}
              onChangePage={handleChangePage}
              onChangeRowsPerPage={handleChangePageSize}
            />
          </TableFooter>
        </Table>
      </TableContainer>
      <CreateUserComponent
        open={isAdd}
        hotels={hotels}
        onSuccess={onSuccess}
        close={handleAddClose}
        createUser={createUser}
      />
    </>
  );
};

UsersTableComponent.propTypes = {
  users: PropTypes.arrayOf(User),
  usersBrief: PropTypes.arrayOf(UserBrief).isRequired,
  onChangeSearchClauses: PropTypes.func.isRequired,
  hotels: PropTypes.arrayOf(HotelBrief),
  totalCount: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  pageChanged: PropTypes.func.isRequired,
  pageSizeChanged: PropTypes.func.isRequired,
  createUser: PropTypes.func.isRequired,
  updateUser: PropTypes.func.isRequired,
  deleteUser: PropTypes.func.isRequired,
  onError: PropTypes.func.isRequired,
  onSuccess: PropTypes.func.isRequired,
};
UsersTableComponent.defaultProps = {
  users: [],
  hotels: [],
};

export default UsersTableComponent;
