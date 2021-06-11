import { fade, InputBase, makeStyles } from '@material-ui/core';
import React from 'react';

const useStyles = makeStyles((theme) => ({
  search: {
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': { backgroundColor: fade(theme.palette.common.white, 0.25) },
    width: '100%',
  },
  searchRoot: {
    background: theme.palette.grey[100],
  },
  searchInput: {
    padding: theme.spacing(1),
  },
}));

const placeholder = 'Search... (name city service)';

const SearchBarComponent = () => {
  const classes = useStyles();
  return (
    <div className={classes.search}>
      <InputBase
        classes={{ root: classes.searchRoot, input: classes.searchInput }}
        placeholder={placeholder}
      />
    </div>
  );
};

export default SearchBarComponent;
