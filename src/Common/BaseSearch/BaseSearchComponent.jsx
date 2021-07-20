import React from 'react';
import PropTypes from 'prop-types';
import { Autocomplete } from '@material-ui/lab';
import {
  TextField,
  IconButton,
  Button,
  Switch,
  FormControlLabel,
  makeStyles,
  Grid,
  Slider,
  Typography,
  Input,
} from '@material-ui/core';
import { AddOutlined, RotateLeftOutlined } from '@material-ui/icons';
import SearchClause from './SearchClause';
import SearchOption from './SearchOption';
import SearchRange from './SearchRange';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
  },
  item: {
    margin: theme.spacing(1),
  },
  itemContent: {
    display: 'flex',
    alignItems: 'center',
  },
  rangeInput: {
    margin: theme.spacing(0, 1),
  },
}));

const BaseSearchComponent = ({
  searchClauses,
  searchOptions,
  searchRanges,
  onChangeSearchClauses,
  onChangeSearchOptions,
  onChangeSearchRanges,
  onSearch,
}) => {
  const classes = useStyles();

  const onChangeSearchClause = (searchClause, value) => {
    const newSearchClause = new SearchClause(
      searchClause.name,
      searchClause.value,
      searchClause.values,
      searchClause.multiple
    );
    newSearchClause.onChange(value);

    const index = searchClauses.findIndex(
      (item) => item.name === newSearchClause.name
    );
    const newSearchClauses = [...searchClauses];
    newSearchClauses[index] = newSearchClause;

    onChangeSearchClauses(newSearchClauses);
  };

  const onChangeSearchOption = (searchOption) => {
    const newSearchOption = new SearchOption(
      searchOption.name,
      !searchOption.value
    );

    const index = searchOptions.findIndex(
      (item) => item.name === newSearchOption.name
    );
    const newSearchOptions = [...searchOptions];
    newSearchOptions[index] = newSearchOption;

    onChangeSearchOptions(newSearchOptions);
  };

  const onChangeSearchRange = (searchRange, newValue) => {
    const newSearchRange = new SearchRange(
      searchRange.name,
      newValue[0],
      newValue[1],
      searchRange.displayValue,
      searchRange.min,
      searchRange.max
    );
    const index = searchRanges.findIndex(
      (item) => item.name === newSearchRange.name
    );
    const newSearchRanges = [...searchRanges];
    newSearchRanges[index] = newSearchRange;

    onChangeSearchRanges(newSearchRanges);
  };

  return (
    <div className={classes.root}>
      <Grid container>
        <Grid container item xs={12}>
          {searchClauses.map((searchClause) => (
            <Grid item xs={12} className={classes.item}>
              <Typography gutterBottom>{searchClause.name}</Typography>
              <div className={classes.itemContent}>
                <Autocomplete
                  multiple={searchClause.multiple}
                  value={searchClause.value}
                  fullWidth
                  freeSolo
                  disableClearable
                  ChipProps={{ size: 'small' }}
                  limitTags={1}
                  getOptionLabel={(option) => option}
                  options={searchClause.values}
                  autoSelect={false}
                  renderOption={(option) => {
                    return option;
                  }}
                  renderInput={(params) => (
                    <div className={classes.itemContent}>
                      <TextField
                        {...params}
                        size="small"
                        variant="outlined"
                        placeholder={searchClause.name}
                        inputProps={{
                          ...params.inputProps,
                          autoComplete: 'new-password',
                        }}
                      />
                      {params.inputProps.value && searchClause.multiple ? (
                        <IconButton
                          size="small"
                          onClick={() => {
                            onChangeSearchClause(searchClause, [
                              ...searchClause.value,
                              params.inputProps.value,
                            ]);
                            // eslint-disable-next-line no-param-reassign
                            params.inputProps.value = '';
                          }}
                        >
                          <AddOutlined />
                        </IconButton>
                      ) : null}
                    </div>
                  )}
                  onInputChange={(event, value) => {
                    if (searchClause.multiple !== true) {
                      onChangeSearchClause(searchClause, value);
                    }
                  }}
                  onChange={(event, value) =>
                    onChangeSearchClause(searchClause, value)
                  }
                />
                <IconButton
                  onClick={() => onChangeSearchClause(searchClause, '')}
                  size="small"
                >
                  <RotateLeftOutlined />
                </IconButton>
              </div>
            </Grid>
          ))}
        </Grid>

        <Grid container item xs={12}>
          {searchOptions.map((searchOption) => (
            <Grid item xs={12} className={classes.item}>
              <FormControlLabel
                control={
                  <Switch
                    size="small"
                    checked={searchOption.value}
                    onChange={() => onChangeSearchOption(searchOption)}
                  />
                }
                label={searchOption.name}
              />
            </Grid>
          ))}
        </Grid>

        <Grid container item xs={12}>
          {searchRanges.map((searchRange) => (
            <Grid item xs={12} className={classes.item}>
              <Typography id="range-slider" gutterBottom>
                {searchRange.name} (
                {searchRange.displayValue(searchRange.value[0])} -{' '}
                {searchRange.displayValue(searchRange.value[1])})
              </Typography>
              <Slider
                value={searchRange.value}
                aria-labelledby="range-slider"
                onChange={(event, value) =>
                  onChangeSearchRange(searchRange, value)
                }
                getAriaValueText={searchRange.displayValue}
                valueLabelDisplay="auto"
                min={searchRange.min}
                max={searchRange.max}
              />
              <div className={classes.itemContent}>
                <Input
                  className={classes.rangeInput}
                  value={searchRange.value[0]}
                  onBlur={() => {
                    const currentRange = searchRange.value;
                    let newValue = searchRange.value[0];

                    if (newValue < searchRange.min) {
                      newValue = searchRange.min;
                    } else if (newValue > searchRange.max) {
                      newValue = searchRange.max;
                    }

                    if (newValue > currentRange[1]) {
                      // eslint-disable-next-line prefer-destructuring
                      currentRange[0] = currentRange[1];
                      currentRange[1] = newValue;
                    } else {
                      currentRange[0] = Number(newValue);
                    }

                    onChangeSearchRange(searchRange, currentRange);
                  }}
                  onChange={(event) => {
                    const newValue = [...searchRange.value];
                    const { value } = event.target;

                    newValue[0] = Number(value);

                    onChangeSearchRange(searchRange, newValue);
                  }}
                />
                <Input
                  className={classes.rangeInput}
                  value={searchRange.value[1]}
                  onBlur={() => {
                    const currentRange = searchRange.value;
                    let newValue = searchRange.value[1];

                    if (newValue < searchRange.min) {
                      newValue = searchRange.min;
                    } else if (newValue > searchRange.max) {
                      newValue = searchRange.max;
                    }

                    if (newValue < currentRange[0]) {
                      // eslint-disable-next-line prefer-destructuring
                      currentRange[1] = currentRange[0];
                      currentRange[0] = newValue;
                    } else {
                      currentRange[1] = Number(newValue);
                    }

                    onChangeSearchRange(searchRange, currentRange);
                  }}
                  onChange={(event) => {
                    const newValue = [...searchRange.value];
                    const { value } = event.target;

                    newValue[1] = Number(value);

                    onChangeSearchRange(searchRange, newValue);
                  }}
                />
                <IconButton
                  onClick={() => onChangeSearchRange(searchRange, ['', ''])}
                  size="small"
                >
                  <RotateLeftOutlined />
                </IconButton>
              </div>
            </Grid>
          ))}
        </Grid>
        <Grid item xs={12} className={classes.item}>
          <Button
            fullWidth
            onClick={() => onSearch()}
            style={{ height: 40 }}
            variant="contained"
            color="primary"
          >
            Search
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};

BaseSearchComponent.propTypes = {
  filters: PropTypes.arrayOf(PropTypes.string),
  searchClauses: PropTypes.arrayOf(SearchClause),
  searchOptions: PropTypes.arrayOf(SearchOption),
  searchRanges: PropTypes.arrayOf(SearchRange),
  onChangeSearchClauses: PropTypes.func.isRequired,
  onChangeSearchOptions: PropTypes.func.isRequired,
  onChangeSearchRanges: PropTypes.func.isRequired,
  onSearch: PropTypes.func.isRequired,
};

BaseSearchComponent.defaultProps = {
  filters: [],
  searchClauses: [],
  searchOptions: [],
  searchRanges: [],
};

export default BaseSearchComponent;
