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
// import AccountIcon from '@material-ui/icons/AccountCircleOutlined';
// import HistoryIcon from '@material-ui/icons/HistoryOutlined';
import LogoutIcon from '@material-ui/icons/ExitToAppOutlined';
import PersonIcon from '@material-ui/icons/PersonOutlined';
import AdminPanelIcon from '@material-ui/icons/SettingsOutlined';
import User from '../../Models/User';

const AdminRole = 'Admin';

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

const AccountSectionComponent = ({
  loggedUser,
  logout,
  openHotelsManagement,
}) => {
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
            startIcon={<PersonIcon />}
          >
            {loggedUser.userName}
          </Button>
          <Menu
            id="menu-area"
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            {/* <MenuItem onClick={handleClose}>
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
            </MenuItem> */}

            {loggedUser.roles.includes(AdminRole) ? (
              <>
                <MenuItem
                  onClick={() => {
                    openHotelsManagement();
                    handleClose();
                  }}
                >
                  <ListItemIcon>
                    <AdminPanelIcon className={classes.icon} />
                  </ListItemIcon>
                  <ListItemText primary="Manage hotels" />
                </MenuItem>
                {/* <MenuItem
                  onClick={() => {
                    handleClose();
                  }}
                >
                  <ListItemIcon>
                    <AdminPanelIcon className={classes.icon} />
                  </ListItemIcon>
                  <ListItemText primary="Manage users" />
                </MenuItem> */}
              </>
            ) : null}

            <MenuItem
              onClick={() => {
                logout();
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

AccountSectionComponent.propTypes = {
  loggedUser: PropTypes.instanceOf(User),
  logout: PropTypes.func.isRequired,
  openHotelsManagement: PropTypes.func.isRequired,
};

AccountSectionComponent.defaultProps = {
  loggedUser: null,
};

export default AccountSectionComponent;
