import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
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
import LogoutIcon from '@material-ui/icons/ExitToAppOutlined';
import PersonIcon from '@material-ui/icons/PersonOutlined';
import AdminPanelIcon from '@material-ui/icons/SettingsOutlined';
import GroupOutlinedIcon from '@material-ui/icons/GroupOutlined';
import { HistoryOutlined } from '@material-ui/icons';
import LoggedUser from '../../Models/LoggedUser';
import Constants from '../../Common/Constants';

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
      textDecoration: 'none',
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
  openUsersManagement,
  openReservationsSection,
}) => {
  const classes = useStyles();
  const history = useHistory();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      {loggedUser ? (
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
            keepMounted
            elevation={1}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
          >
            <MenuItem
              onClick={() => {
                handleMenuClose();
                history.push('/Profile');
              }}
            >
              <ListItemIcon>
                <AccountIcon className={classes.icon} />
              </ListItemIcon>
              <ListItemText primary="Profile" />
            </MenuItem>

            <MenuItem
              onClick={() => {
                openReservationsSection();
                handleMenuClose();
              }}
            >
              <ListItemIcon>
                <HistoryOutlined className={classes.icon} />
              </ListItemIcon>
              <ListItemText primary="View reservations" />
            </MenuItem>

            {loggedUser?.roles?.includes(Constants.adminRole) ||
            loggedUser?.roles?.includes(Constants.managerRole) ? (
              <MenuItem
                onClick={() => {
                  openHotelsManagement();
                  handleMenuClose();
                }}
              >
                <ListItemIcon>
                  <AdminPanelIcon className={classes.icon} />
                </ListItemIcon>
                <ListItemText primary="Manage hotels" />
              </MenuItem>
            ) : null}

            {loggedUser?.roles?.includes(Constants.adminRole) ? (
              <MenuItem
                onClick={() => {
                  openUsersManagement();
                  handleMenuClose();
                }}
              >
                <ListItemIcon>
                  <GroupOutlinedIcon className={classes.icon} />
                </ListItemIcon>
                <ListItemText primary="Manage users" />
              </MenuItem>
            ) : null}

            <MenuItem
              onClick={() => {
                logout();
                handleMenuClose();
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
  loggedUser: PropTypes.instanceOf(LoggedUser),
  logout: PropTypes.func.isRequired,
  openHotelsManagement: PropTypes.func.isRequired,
  openUsersManagement: PropTypes.func.isRequired,
  openReservationsSection: PropTypes.func.isRequired,
};

AccountSectionComponent.defaultProps = {
  loggedUser: null,
};

export default AccountSectionComponent;
