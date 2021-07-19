import React from 'react';
import PropTypes from 'prop-types';
import { Autocomplete } from '@material-ui/lab';
import { TextField, IconButton } from '@material-ui/core';
import { AddOutlined } from '@material-ui/icons';
import SearchClause from './SearchClauses';

const BaseSearchComponent = ({ searchClauses, onChangeSearchClauses }) => {
  return (
    <div>
      {searchClauses.map((searchClause) => (
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
              {params.inputProps.value ? (
                <IconButton size="small" onClick={() => {}}>
                  <AddOutlined />
                </IconButton>
              ) : null}
            </>
          )}
          onInputChange={(event, value) => {
            if (searchClause.multiple !== true) {
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
            }
          }}
          onChange={(event, value) => {
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
          }}
        />
      ))}
    </div>
  );
};

BaseSearchComponent.propTypes = {
  filters: PropTypes.arrayOf(PropTypes.string),
  searchClauses: PropTypes.arrayOf(SearchClause),
  onChangeSearchClauses: PropTypes.func.isRequired,
};

BaseSearchComponent.defaultProps = {
  filters: [],
  searchClauses: [],
};

export default BaseSearchComponent;
