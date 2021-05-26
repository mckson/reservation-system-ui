import React from 'react';
import { Link, Toolbar, AppBar } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import User from '../Models/Models/User';
import AccountSection from '../Models/Components/AccountSection';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 2,
    margin: theme.spacing(0, 0, 5, 0),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  toolbar: {
    display: 'flex',
  },
  title: {
    flexGrow: 1,
    color: 'white',
  },
  account: {
    flexGrow: 1,
    display: 'flex',
    width: 'auto',
    justifyContent: 'flex-end',
    marginLeft: theme.spacing(1),
  },
}));

const Navbar = ({ loggedUser, onLogoutClick }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar className={classes.toolbar}>
          <Link href="/Hotels" variant="h6" className={classes.title}>
            Hotel Reservation System
          </Link>

          <div className={classes.account}>
            <AccountSection
              loggedUser={loggedUser}
              onLogoutClick={onLogoutClick}
            />
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
};

Navbar.propTypes = {
  loggedUser: PropTypes.instanceOf(User),
  onLogoutClick: PropTypes.func.isRequired,
};

Navbar.defaultProps = {
  loggedUser: null,
};

export default Navbar;
