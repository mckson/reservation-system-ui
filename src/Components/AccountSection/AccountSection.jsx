import React from 'react';
import PropTypes from 'prop-types';
import User from '../../Models/User';
import AccountSectionComponent from './AccountSectionComponent';

const AccountSection = ({ loggedUser, logout, openHotelsManagement }) => {
  return (
    <AccountSectionComponent
      loggedUser={loggedUser}
      logout={logout}
      openHotelsManagement={openHotelsManagement}
    />
  );
};

AccountSection.propTypes = {
  loggedUser: PropTypes.instanceOf(User),
  logout: PropTypes.func.isRequired,
  openHotelsManagement: PropTypes.func.isRequired,
};

AccountSection.defaultProps = {
  loggedUser: null,
};

export default AccountSection;
