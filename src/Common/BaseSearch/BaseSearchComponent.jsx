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
} from '@material-ui/core';
import { AddOutlined } from '@material-ui/icons';
import SearchClause from './SearchClause';
import SearchOption from './SearchOption';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
  },
  item: {
    margin: theme.spacing(1),
  },
}));

const BaseSearchComponent = ({
  searchClauses,
  searchOptions,
  onChangeSearchClauses,
  onChangeSearchOptions,
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

  return (
    <div className={classes.root}>
      <Grid container>
        {searchClauses.map((searchClause) => (
          <Grid item xs={12} className={classes.item}>
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
                <>
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
                </>
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
          </Grid>
        ))}
        {searchOptions.map((searchOption) => (
          <Grid item xs={12} md={2} className={classes.item}>
            <FormControlLabel
              control={
                <Switch
                  checked={searchOption.value}
                  onChange={() => onChangeSearchOption(searchOption)}
                />
              }
              label={searchOption.name}
            />
          </Grid>
        ))}
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
  onChangeSearchClauses: PropTypes.func.isRequired,
  onChangeSearchOptions: PropTypes.func.isRequired,
  onSearch: PropTypes.func.isRequired,
};

BaseSearchComponent.defaultProps = {
  filters: [],
  searchClauses: [],
  searchOptions: [],
};

export default BaseSearchComponent;
