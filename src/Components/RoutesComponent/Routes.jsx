import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import RoutesComponent from './RoutesComponent';
import Hotel from '../../Models/Hotel';
import LoggedUser from '../../Models/LoggedUser';

const Routes = ({
  hotels,
  totalPages,
  totalResults,
  pageChanged,
  loguot,
  submit,
  searchHotels,
  dateIn,
  dateOut,
  onDateInChange,
  onDateOutChange,
}) => {
  const [openHotelsManagement, setOpenHotelsManagement] = useState(false);
  const [openUsersManagement, setOpenUsersManagement] = useState(false);
  const [openReservations, setOpenReservations] = useState(false);

  const user = useSelector((state) => state.loggedUser.loggedUser);

  const handleOpenHotelsManagement = () => {
    setOpenHotelsManagement(true);
  };

  const handleCloseHotelsManagement = () => {
    setOpenHotelsManagement(false);
  };

  const handleOpenReservations = () => {
    setOpenReservations(true);
  };

  const handleCloseReservations = () => {
    setOpenReservations(false);
  };

  const handleOpenUsersManagement = () => {
    setOpenUsersManagement(true);
  };

  const handleCloseUsersManagement = () => {
    setOpenUsersManagement(false);
  };

  return (
    <RoutesComponent
      loggedUser={user ? new LoggedUser(user) : null}
      hotels={hotels}
      totalPages={totalPages}
      totalResults={totalResults}
      pageChanged={pageChanged}
      loguot={loguot}
      submit={submit}
      searchHotels={searchHotels}
      isHotelsManagementOpen={openHotelsManagement}
      closeHotelsManagement={handleCloseHotelsManagement}
      openHotelsManagement={handleOpenHotelsManagement}
      isReservationsOpen={openReservations}
      closeReservations={handleCloseReservations}
      openReservations={handleOpenReservations}
      isUsersManagementOpen={openUsersManagement}
      closeUsersManagement={handleCloseUsersManagement}
      openUsersManagement={handleOpenUsersManagement}
      // isProfileOpen={openProfile}
      // closeProfile={handleCloseProfile}
      // openProfile={handleOpenProfile}
      dateIn={dateIn}
      dateOut={dateOut}
      onDateInChange={onDateInChange}
      onDateOutChange={onDateOutChange}
    />
  );
};

Routes.propTypes = {
  hotels: PropTypes.arrayOf(Hotel),
  totalPages: PropTypes.number,
  totalResults: PropTypes.number,
  pageChanged: PropTypes.func.isRequired,
  loguot: PropTypes.func.isRequired,
  submit: PropTypes.func.isRequired,
  searchHotels: PropTypes.func.isRequired,
  dateIn: PropTypes.string,
  dateOut: PropTypes.string,
  onDateInChange: PropTypes.func.isRequired,
  onDateOutChange: PropTypes.func.isRequired,
};

Routes.defaultProps = {
  hotels: null,
  totalPages: 0,
  totalResults: 0,
  dateIn: null,
  dateOut: null,
};

export default Routes;
