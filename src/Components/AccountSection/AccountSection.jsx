import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import AccountSectionComponent from './AccountSectionComponent';
import LoggedUser from '../../Models/LoggedUser';

const AccountSection = ({
  logout,
  openHotelsManagement,
  openUsersManagement,
  openReservationsSection,
}) => {
  const user = useSelector((state) => state.loggedUser.loggedUser);

  return (
    <AccountSectionComponent
      loggedUser={user ? new LoggedUser(user) : null}
      logout={logout}
      openHotelsManagement={openHotelsManagement}
      openUsersManagement={openUsersManagement}
      openReservationsSection={openReservationsSection}
    />
  );
};

AccountSection.propTypes = {
  logout: PropTypes.func.isRequired,
  openHotelsManagement: PropTypes.func.isRequired,
  openUsersManagement: PropTypes.func.isRequired,
  openReservationsSection: PropTypes.func.isRequired,
};

export default AccountSection;
