import {
  Button,
  InputBase,
  TextField,
  makeStyles,
  IconButton,
} from '@material-ui/core';
import React from 'react';
import PropTypes from 'prop-types';
import { Autocomplete } from '@material-ui/lab';
import { AddOutlined } from '@material-ui/icons';
import HotelBrief from '../../Models/HotelBrief';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    display: 'flex',
    backgroundColor: theme.palette.common.white,
    alignItems: 'center',
  },
  search: {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
  },
  multipleWrapper: {
    display: 'flex',
    alignItems: 'center',
  },
  searchIcon: {
    color: theme.palette.primary.main,
    padding: theme.spacing(0, 1),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchInput: {
    width: '100%',
    border: 'none',
    margin: theme.spacing(0, 1, 0, 0),
  },
  dateRange: {
    display: 'flex',
    borderColor: theme.palette.grey[300],
    borderRadius: theme.shape.borderRadius,
    borderStyle: 'solid',
    borderWidth: 1,
    margin: theme.spacing(0, 1, 0, 0),
  },
  datepicker: {
    padding: 0,
  },
}));

const SearchBarComponent = ({
  hotels,
  cities,
  searchName,
  searchCity,
  selectedServices,
  creatingService,
  onSubmit,
  onChangeName,
  onChangeCity,
  onAddNewService,
  onChangeNewService,
  onChangeServices,
  onChangeDateIn,
  onChangeDateOut,
}) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.search}>
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
        <Autocomplete
          className={classes.searchInput}
          value={searchCity}
          fullWidth
          freeSolo
          disableClearable
          autoSelect={false}
          options={cities}
          getOptionLabel={(option) => option}
          renderInput={(params) => (
            <TextField
              {...params}
              size="small"
              variant="outlined"
              placeholder="City"
            />
          )}
          onInputChange={(event, value) => {
            onChangeCity(value);
          }}
        />
        <Autocomplete
          className={classes.searchInput}
          value={selectedServices}
          fullWidth
          freeSolo
          multiple
          ChipProps={{ size: 'small' }}
          limitTags={1}
          disableClearable
          options={[]}
          getOptionLabel={(option) => option}
          renderInput={(params) => (
            <div className={classes.multipleWrapper}>
              <TextField
                {...params}
                size="small"
                variant="outlined"
                placeholder="Services"
              />
              {creatingService ? (
                <IconButton size="small" onClick={() => onAddNewService()}>
                  <AddOutlined />
                </IconButton>
              ) : null}
            </div>
          )}
          onInputChange={(event, value) => {
            onChangeNewService(value);
          }}
          onChange={(event, value) => onChangeServices(value)}
        />
      </div>
      <div className={classes.dateRange}>
        <div name="dateIn">
          <InputBase
            inputProps={{
              style: {
                padding: 5,
                height: 28,
              },
            }}
            variant="outlined"
            type="date"
            onChange={(event) => onChangeDateIn(event.target.value)}
            className={classes.datepicker}
          />
        </div>
        <div name="dateOut">
          <InputBase
            inputProps={{
              style: {
                padding: 5,
                height: 28,
              },
            }}
            variant="outlined"
            type="date"
            onChange={(event) => onChangeDateOut(event.target.value)}
            className={classes.datepicker}
          />
        </div>
      </div>
      <div className={classes.button}>
        <Button
          onClick={() => onSubmit()}
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

SearchBarComponent.propTypes = {
  hotels: PropTypes.arrayOf(HotelBrief).isRequired,
  cities: PropTypes.arrayOf(PropTypes.string).isRequired,
  searchName: PropTypes.string,
  searchCity: PropTypes.string,
  selectedServices: PropTypes.arrayOf(PropTypes.string).isRequired,
  creatingService: PropTypes.string,
  onAddNewService: PropTypes.func.isRequired,
  onChangeNewService: PropTypes.isRequired,
  onChangeServices: PropTypes.isRequired,
  onChangeDateIn: PropTypes.isRequired,
  onChangeDateOut: PropTypes.isRequired,
  onChangeName: PropTypes.func.isRequired,
  onChangeCity: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

SearchBarComponent.defaultProps = {
  searchName: null,
  searchCity: null,
  creatingService: null,
};

export default SearchBarComponent;
