import { makeStyles } from '@material-ui/core';

const useRowStyles = makeStyles((theme) => ({
  row: {
    '& > *': {
      borderBottom: 'unset',
    },
    background: theme.palette.background.paper,
    // '&.Mui-selected': { background: theme.palette.grey[400] },
    // '&.Mui-selected:hover': { background: theme.palette.grey[300] },
  },
  subrowTitle: {
    display: 'flex',
    alignItems: 'center',
  },
  subrow: {
    margin: theme.spacing(0, 5),
    display: 'flex',
    flexDirection: 'column',
    width: 'auto',
  },
  table: {
    margin: theme.spacing(0, 0, 2),
  },
  button: {
    margin: 0,
    color: theme.palette.primary.main,
  },
  actions: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: 'auto',
  },
}));

export default useRowStyles;
