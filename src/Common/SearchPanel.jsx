import React from 'react';
import PropTypes from 'prop-types';
import { Button, Drawer, makeStyles } from '@material-ui/core';
import { SearchOutlined } from '@material-ui/icons';
import BaseSearch from './BaseSearch/BaseSearch';
import SearchOption from './BaseSearch/SearchOption';
import SearchRange from './BaseSearch/SearchRange';
import SearchClause from './BaseSearch/SearchClause';

const useStyles = makeStyles((theme) => ({
  searchSection: {
    width: `calc('100%'-${theme.spacing(2)})`,
    padding: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      width: '40%',
    },
    [theme.breakpoints.up('md')]: {
      width: '30%',
    },
    [theme.breakpoints.up('lg')]: {
      width: '20%',
    },
  },
}));

const SearchPanel = ({
  open,
  onOpen,
  onClose,
  title,
  prompts,
  clauses,
  ranges,
  options,
  onChangeClauses,
  onChangeOptions,
  onChangeRanges,
  onSearch,
}) => {
  const classes = useStyles();
  return (
    <>
      <Button onClick={() => onOpen()} startIcon={<SearchOutlined />}>
        {title}
      </Button>
      <div className={classes.searchSection}>
        <Drawer
          open={open}
          onClose={onClose}
          classes={{ paper: classes.searchSection }}
        >
          <div>
            <BaseSearch
              prompts={prompts}
              clauses={clauses}
              ranges={ranges}
              options={options}
              onChangeClauses={onChangeClauses}
              onChangeOptions={onChangeOptions}
              onChangeRanges={onChangeRanges}
              onSearch={onSearch}
            />
          </div>
        </Drawer>
      </div>
    </>
  );
};

SearchPanel.propTypes = {
  open: PropTypes.bool.isRequired,
  onOpen: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  onSearch: PropTypes.func.isRequired,
  clauses: PropTypes.arrayOf(SearchClause),
  ranges: PropTypes.arrayOf(SearchRange),
  options: PropTypes.arrayOf(SearchOption),
  // eslint-disable-next-line react/forbid-prop-types
  prompts: PropTypes.array,
  onChangeClauses: PropTypes.func,
  onChangeRanges: PropTypes.func,
  onChangeOptions: PropTypes.func,
  title: PropTypes.string.isRequired,
};

SearchPanel.defaultProps = {
  clauses: [],
  ranges: [],
  options: [],
  prompts: [],
  onChangeClauses: null,
  onChangeRanges: null,
  onChangeOptions: null,
};

export default SearchPanel;
