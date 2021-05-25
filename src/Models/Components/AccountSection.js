import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  makeStyles,
  Link,
} from '@material-ui/core';
import AccountIcon from '@material-ui/icons/AccountCircleOutlined';
import HistoryIcon from '@material-ui/icons/HistoryOutlined';
import LogoutIcon from '@material-ui/icons/ExitToAppOutlined';
import User from '../Models/User';

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(0),
    padding: theme.spacing(1, 1),
    border: 0,
    borderRadius: '15px',
    color: 'white',
    height: 40,
    width: '100%',
    textAlign: 'center',
    textTransform: 'uppercase',
    '&:hover': {
      background: 'transparent',
    },
  },
  icon: {
    color: theme.palette.primary.main,
  },
}));

const AccountSection = ({ loggedUser, onLogoutClick }) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      {loggedUser != null ? (
        <>
          <Button
            className={classes.button}
            aria-controls="menu-area"
            aria-haspopup="true"
            onClick={handleClick}
          >
            {loggedUser.userName}
          </Button>
          <Menu
            id="menu-area"
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={handleClose}>
              <ListItemIcon>
                <AccountIcon className={classes.icon} />
              </ListItemIcon>
              <ListItemText primary="Manage account" />
            </MenuItem>
            <MenuItem onClick={handleClose}>
              <ListItemIcon>
                <HistoryIcon className={classes.icon} />
              </ListItemIcon>
              <ListItemText primary="View orders" />
            </MenuItem>
            <MenuItem
              onClick={() => {
                onLogoutClick();
                handleClose();
              }}
            >
              <ListItemIcon>
                <LogoutIcon className={classes.icon} />
              </ListItemIcon>
              <ListItemText primary="Sign out" />
            </MenuItem>
          </Menu>
        </>
      ) : (
        <Link href="/SignIn" variant="button" className={classes.button}>
          Sign in
        </Link>
      )}
    </div>
  );
};

AccountSection.propTypes = {
  loggedUser: PropTypes.instanceOf(User),
  onLogoutClick: PropTypes.func.isRequired,
};

AccountSection.defaultProps = {
  loggedUser: null,
};

export default AccountSection;
