import React from 'react';
import { TextField, Button, makeStyles } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import PropTypes from 'prop-types';
import HotelBrief from '../../../Models/HotelBrief';

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

const SearchHotelsComponent = ({
  hotels,
  searchName,
  onChangeName,
  onSearch,
}) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Autocomplete
        className={classes.searchInput}
        inputValue={searchName || ''}
        fullWidth
        freeSolo
        disableClearable
        options={hotels}
        autoSelect={false}
        getOptionLabel={(option) => {
          return option.name;
        }}
        renderOption={(option) => `${option.name} (${option.location.city})`}
        renderInput={(params) => (
          <TextField
            {...params}
            size="small"
            variant="outlined"
            placeholder="Hotel"
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

SearchHotelsComponent.propTypes = {
  hotels: PropTypes.arrayOf(HotelBrief).isRequired,
  searchName: PropTypes.string,
  onChangeName: PropTypes.func.isRequired,
  onSearch: PropTypes.func.isRequired,
};

SearchHotelsComponent.defaultProps = {
  searchName: null,
};

export default SearchHotelsComponent;
