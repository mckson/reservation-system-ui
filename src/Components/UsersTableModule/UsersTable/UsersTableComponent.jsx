import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Drawer,
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
import { SearchOutlined, AddOutlined } from '@material-ui/icons';
import User from '../../../Models/User';
import UserRow from '../UserRow/UserRow';
import CreateUserComponent from '../CreateUserComponent';
import HotelBrief from '../../../Models/HotelBrief';
import BaseSearch from '../../../Common/BaseSearch/BaseSearch';
import SearchClause from '../../../Common/BaseSearch/SearchClause';
import SearchRange from '../../../Common/BaseSearch/SearchRange';
import SearchOption from '../../../Common/BaseSearch/SearchOption';

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
  onSearch,
  clauses,
  ranges,
  options,
  onChangeClauses,
  onChangeRanges,
  onChangeOptions,
  searchVariants,
}) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowPerPage] = useState(pageSize);
  const [isAdd, setIsAdd] = useState(false);
  const [openSearch, setOpenSearch] = useState(false);

  const classes = useStyles();

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
      <Button
        onClick={() => setOpenSearch(true)}
        startIcon={<SearchOutlined />}
      >
        Setup user search options
      </Button>
      <div className={classes.searchSection}>
        <Drawer
          open={openSearch}
          onClose={() => setOpenSearch(false)}
          classes={{ paper: classes.searchSection }}
        >
          <div>
            <BaseSearch
              clauses={clauses}
              ranges={ranges}
              options={options}
              prompts={searchVariants}
              onChangeClauses={onChangeClauses}
              onChangeOptions={onChangeOptions}
              onChangeRanges={onChangeRanges}
              onSearch={onSearch}
            />
          </div>
        </Drawer>
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
              <TableRow>No users</TableRow>
            )}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell>
                <Button
                  color="primary"
                  startIcon={<AddOutlined />}
                  onClick={() => setIsAdd(!isAdd)}
                  className={classes.addButton}
                >
                  Add new user
                </Button>
              </TableCell>
              <TablePagination
                rowsPerPageOptions={[5, 10, 15]}
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
  onSearch: PropTypes.func.isRequired,
  clauses: PropTypes.arrayOf(SearchClause),
  ranges: PropTypes.arrayOf(SearchRange),
  options: PropTypes.arrayOf(SearchOption),
  onChangeClauses: PropTypes.func,
  onChangeRanges: PropTypes.func,
  onChangeOptions: PropTypes.func,
  users: PropTypes.arrayOf(User),
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
  // eslint-disable-next-line react/forbid-prop-types
  searchVariants: PropTypes.array,
};

UsersTableComponent.defaultProps = {
  users: [],
  hotels: [],
  clauses: [],
  ranges: [],
  options: [],
  searchVariants: [],
  onChangeClauses: null,
  onChangeRanges: null,
  onChangeOptions: null,
};

export default UsersTableComponent;
