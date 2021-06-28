import React from 'react';
import PropTypes from 'prop-types';
import User from '../../Models/User';
import AccountSectionComponent from './AccountSectionComponent';
// import { useEffect } from 'react';
// import API from '../../Common/API';

const AccountSection = ({
  loggedUser,
  logout,
  openHotelsManagement,
  openReservationsSection,
}) => {
  // useEffect(async () => {
  //   const response = await API.getReservations();
  // })

  return (
    <AccountSectionComponent
      loggedUser={loggedUser}
      logout={logout}
      openHotelsManagement={openHotelsManagement}
      openReservationsSection={openReservationsSection}
    />
  );
};

AccountSection.propTypes = {
  loggedUser: PropTypes.instanceOf(User),
  logout: PropTypes.func.isRequired,
  openHotelsManagement: PropTypes.func.isRequired,
  openReservationsSection: PropTypes.func.isRequired,
};

AccountSection.defaultProps = {
  loggedUser: null,
};

export default AccountSection;
