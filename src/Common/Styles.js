import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(5),
  },
  submit: {
    margin: theme.spacing(5, 0, 2),
    background: 'linear-gradient(45deg, #1A2980 0%, #26D0CE 51%, #1A2980 100%)',
    border: 0,
    borderRadius: '15px',
    color: 'white',
    height: 40,
    padding: '15px 45px',
    textAlign: 'center',
    textTransform: 'uppercase',
  },
}));

export default useStyles;
