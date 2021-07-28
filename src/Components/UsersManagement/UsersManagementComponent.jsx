import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Snackbar, makeStyles } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import FullScreenDialog from '../../Common/FullScreenDialog';
import UsersTable from '../UsersTableModule/UsersTable/UsersTable';
import User from '../../Models/User';
import HotelBrief from '../../Models/HotelBrief';
import UserBrief from '../../Models/UserBrief';
import SearchClause from '../../Common/BaseSearch/SearchClause';
import SearchRange from '../../Common/BaseSearch/SearchRange';
import SearchOption from '../../Common/BaseSearch/SearchOption';

const useStyles = makeStyles((theme) => ({
  content: {
    margin: theme.spacing(3, 7),
  },
  contentItem: {
    margin: theme.spacing(0, 0, 3, 0),
  },
}));

const UsersManagementComponent = ({
  onSearch,
  clauses,
  ranges,
  options,
  onChangeClauses,
  onChangeRanges,
  onChangeOptions,
  isOpen,
  hotels,
  close,
  users,
  usersBrief,
  createUser,
  updateUser,
  deleteUser,
  totalCount,
  pageChanged,
  pageSizeChanged,
  pageSize,
  searchVariants,
  onOrderChanged,
  orderBy,
  order,
}) => {
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const classes = useStyles();

  const handleResetError = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setError(null);
  };

  const handleResetSuccess = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setSuccess(null);
  };

  const handleError = (errorMessage) => {
    setError(errorMessage);
  };

  const handleSuccess = (successMessage) => {
    setSuccess(successMessage);
  };

  const usersManagementDialogTitle = 'Users management';
  return (
    <FullScreenDialog
      isOpen={isOpen}
      close={close}
      title={usersManagementDialogTitle}
    >
      <div className={classes.content}>
        <div className={classes.contentItem}>
          <UsersTable
            onSearch={onSearch}
            clauses={clauses}
            options={options}
            ranges={ranges}
            onChangeClauses={onChangeClauses}
            onChangeRanges={onChangeRanges}
            onChangeOptions={onChangeOptions}
            users={users}
            usersBrief={usersBrief}
            hotels={hotels}
            createUser={createUser}
            updateUser={updateUser}
            deleteUser={deleteUser}
            onError={handleError}
            onSuccess={handleSuccess}
            totalCount={totalCount}
            pageChanged={pageChanged}
            pageSizeChanged={pageSizeChanged}
            pageSize={pageSize}
            searchVariants={searchVariants}
            onOrderChanged={onOrderChanged}
            orderBy={orderBy}
            order={order}
          />
          <Snackbar
            open={!!error}
            autoHideDuration={5000}
            onClose={handleResetError}
          >
            <Alert onClose={handleResetError} severity="error" variant="filled">
              {error}
            </Alert>
          </Snackbar>
          <Snackbar
            open={!!success}
            autoHideDuration={5000}
            onClose={handleResetSuccess}
          >
            <Alert
              onClose={handleResetSuccess}
              severity="success"
              variant="filled"
            >
              {success}
            </Alert>
          </Snackbar>
        </div>
      </div>
    </FullScreenDialog>
  );
};

UsersManagementComponent.propTypes = {
  onSearch: PropTypes.func.isRequired,
  clauses: PropTypes.arrayOf(SearchClause),
  ranges: PropTypes.arrayOf(SearchRange),
  options: PropTypes.arrayOf(SearchOption),
  onChangeClauses: PropTypes.func,
  onChangeRanges: PropTypes.func,
  onChangeOptions: PropTypes.func,
  isOpen: PropTypes.bool.isRequired,
  close: PropTypes.func.isRequired,
  users: PropTypes.arrayOf(User),
  usersBrief: PropTypes.arrayOf(UserBrief).isRequired,
  hotels: PropTypes.arrayOf(HotelBrief),
  createUser: PropTypes.func.isRequired,
  updateUser: PropTypes.func.isRequired,
  deleteUser: PropTypes.func.isRequired,
  totalCount: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  pageChanged: PropTypes.func.isRequired,
  pageSizeChanged: PropTypes.func.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  searchVariants: PropTypes.array,
  onOrderChanged: PropTypes.func.isRequired,
  orderBy: PropTypes.string,
  order: PropTypes.string.isRequired,
};

UsersManagementComponent.defaultProps = {
  users: [],
  hotels: [],
  clauses: [],
  ranges: [],
  options: [],
  searchVariants: [],
  onChangeClauses: null,
  onChangeRanges: null,
  onChangeOptions: null,
  orderBy: null,
};

export default UsersManagementComponent;
