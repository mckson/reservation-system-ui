import React from 'react';
import { TextField, Button, makeStyles } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import PropTypes from 'prop-types';
import UserBrief from '../../../Models/UserBrief';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    display: 'flex',
    backgroundColor: theme.palette.common.white,
    alignItems: 'center',
  },
  searchInput: {
    width: '100%',
    border: 'none',
    margin: theme.spacing(0, 1, 0, 0),
  },
}));

const SearchUsersComponent = ({
  users,
  searchEmail,
  searchSurname,
  searchName,
  onChangeName,
  onChangeSurname,
  onChangeEmail,
  onSearch,
}) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Autocomplete
        className={classes.searchInput}
        inputValue={searchEmail || ''}
        fullWidth
        freeSolo
        disableClearable
        options={users}
        autoSelect={false}
        getOptionLabel={(option) => option.email}
        renderOption={(option) => `${option.email}`}
        renderInput={(params) => (
          <TextField
            {...params}
            size="small"
            variant="outlined"
            placeholder="Email"
          />
        )}
        onInputChange={(event, value) => {
          onChangeEmail(value);
        }}
      />
      <Autocomplete
        className={classes.searchInput}
        inputValue={searchSurname || ''}
        fullWidth
        freeSolo
        disableClearable
        options={users}
        autoSelect={false}
        getOptionLabel={(option) => option.firstName}
        renderOption={(option) => `${option.firstName}`}
        renderInput={(params) => (
          <TextField
            {...params}
            size="small"
            variant="outlined"
            placeholder="Surname"
          />
        )}
        onInputChange={(event, value) => {
          onChangeSurname(value);
        }}
      />
      <Autocomplete
        className={classes.searchInput}
        inputValue={searchName || ''}
        fullWidth
        freeSolo
        disableClearable
        options={users}
        autoSelect={false}
        getOptionLabel={(option) => option.lastName}
        renderOption={(option) => `${option.lastName}`}
        renderInput={(params) => (
          <TextField
            {...params}
            autoComplete={false}
            size="small"
            variant="outlined"
            placeholder="Name"
          />
        )}
        onInputChange={(event, value) => {
          onChangeName(value);
        }}
      />
      <div className={classes.button}>
        <Button
          onClick={() => onSearch()}
          style={{ height: 40 }}
          variant="contained"
          color="primary"
        >
          Search
        </Button>
      </div>
    </div>
  );
};

SearchUsersComponent.propTypes = {
  users: PropTypes.arrayOf(UserBrief).isRequired,
  searchEmail: PropTypes.string,
  searchSurname: PropTypes.string,
  searchName: PropTypes.string,
  onChangeName: PropTypes.func.isRequired,
  onChangeSurname: PropTypes.func.isRequired,
  onChangeEmail: PropTypes.func.isRequired,
  onSearch: PropTypes.func.isRequired,
};

SearchUsersComponent.defaultProps = {
  searchEmail: null,
  searchSurname: null,
  searchName: null,
};

export default SearchUsersComponent;
