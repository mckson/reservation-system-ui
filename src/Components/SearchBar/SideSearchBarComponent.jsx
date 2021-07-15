import { Autocomplete } from '@material-ui/lab';
import {
  Button,
  makeStyles,
  TextField,
  Typography,
  IconButton,
  Grid,
} from '@material-ui/core';
import PropTypes from 'prop-types';
import { AddOutlined } from '@material-ui/icons';
import HotelBrief from '../../Models/HotelBrief';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    display: 'flex',
    backgroundColor: theme.palette.common.white,
  },
  grid: {
    padding: theme.spacing(1),
    background: theme.palette.grey[100],
    borderRadius: theme.shape.borderRadius,
  },
  textfield: {
    padding: 0,
    background: theme.palette.common.white,
  },
  multipleWrapper: {
    display: 'flex',
    alignItems: 'center',
  },
}));

const SideSearchBarComponent = ({
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
    <Grid container spacing={1} className={classes.grid}>
      <Typography variant="h6">Search</Typography>
      <Grid item xs={12}>
        <Typography variant="body1">Hotel</Typography>
        <Autocomplete
          className={classes.textfield}
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
      </Grid>

      <Grid item xs={12}>
        <Typography variant="body1">City</Typography>
        <Autocomplete
          className={classes.textfield}
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
      </Grid>

      <Grid item xs={12}>
        <Typography variant="body1">Services</Typography>
        <Autocomplete
          className={classes.textfield}
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
      </Grid>

      <Grid item xs={12}>
        <Typography variant="body1">Date-in</Typography>
        <TextField
          fullWidth
          size="small"
          variant="outlined"
          type="date"
          onChange={(event) => onChangeDateIn(event.target.value)}
          className={classes.textfield}
        />
      </Grid>

      <Grid item xs={12}>
        <Typography variant="body1">Date-out</Typography>
        <TextField
          fullWidth
          size="small"
          variant="outlined"
          type="date"
          onChange={(event) => onChangeDateOut(event.target.value)}
          className={classes.textfield}
        />
      </Grid>
      <Grid item xs={12}>
        <div className={classes.button}>
          <Button
            fullWidth
            onClick={() => onSubmit()}
            style={{ height: 40 }}
            variant="contained"
            color="primary"
          >
            Search
          </Button>
        </div>
      </Grid>
    </Grid>
  );
};

SideSearchBarComponent.propTypes = {
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

SideSearchBarComponent.defaultProps = {
  searchName: null,
  searchCity: null,
  creatingService: null,
};

export default SideSearchBarComponent;
