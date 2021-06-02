import React from 'react';
import PropTypes from 'prop-types';
import User from '../../Models/User';
import AccountSectionComponent from './AccountSectionComponent';

const AccountSection = ({ loggedUser, logout, manageHotels }) => {
  return (
    <AccountSectionComponent
      loggedUser={loggedUser}
      logout={logout}
      manageHotels={manageHotels}
    />
  );
};

AccountSection.propTypes = {
  loggedUser: PropTypes.instanceOf(User),
  logout: PropTypes.func.isRequired,
  manageHotels: PropTypes.func.isRequired,
};

AccountSection.defaultProps = {
  loggedUser: null,
};

export default AccountSection;
