import React, { useState } from 'react';
import PropTypes from 'prop-types';
import RoutesComponent from './RoutesComponent';
import User from '../../Models/User';
import Hotel from '../../Models/Hotel';

const Routes = ({
  loggedUser,
  hotels,
  totalPages,
  totalResults,
  pageChanged,
  loguot,
  submit,
  searchHotels,
}) => {
  const [open, setOpen] = useState(false);

  const onOpen = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };

  return (
    <RoutesComponent
      loggedUser={loggedUser}
      hotels={hotels}
      totalPages={totalPages}
      totalResults={totalResults}
      pageChanged={pageChanged}
      loguot={loguot}
      submit={submit}
      searchHotels={searchHotels}
      isHotelsManagementOpen={open}
      closeHotelsManagement={onClose}
      openHotelsManagement={onOpen}
    />
  );
};

Routes.propTypes = {
  loggedUser: PropTypes.instanceOf(User).isRequired,
  hotels: PropTypes.instanceOf(Hotel).isRequired,
  totalPages: PropTypes.number.isRequired,
  totalResults: PropTypes.number.isRequired,
  pageChanged: PropTypes.func.isRequired,
  loguot: PropTypes.func.isRequired,
  submit: PropTypes.func.isRequired,
  searchHotels: PropTypes.func.isRequired,
};

export default Routes;
