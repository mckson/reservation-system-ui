import React, { useState } from 'react';
import PropTypes from 'prop-types';
import RoutesComponent from './RoutesComponent';
import User from '../../Models/User';
import Hotel from '../../Models/Hotel';

const Routes = ({
  users,
  loggedUser,
  hotels,
  totalPages,
  totalResults,
  pageSize,
  pageChanged,
  pageSizeChanged,
  deleteHotel,
  updateHotel,
  createHotel,
  createRoom,
  updateRoom,
  deleteRoom,
  createService,
  updateService,
  deleteService,
  updateUser,
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
      users={users}
      loggedUser={loggedUser}
      hotels={hotels}
      totalPages={totalPages}
      totalResults={totalResults}
      pageSize={pageSize}
      pageChanged={pageChanged}
      pageSizeChanged={pageSizeChanged}
      deleteHotel={deleteHotel}
      updateHotel={updateHotel}
      createHotel={createHotel}
      createRoom={createRoom}
      updateRoom={updateRoom}
      deleteRoom={deleteRoom}
      createService={createService}
      updateService={updateService}
      deleteService={deleteService}
      updateUser={updateUser}
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
  users: PropTypes.arrayOf(User).isRequired,
  loggedUser: PropTypes.instanceOf(User).isRequired,
  hotels: PropTypes.instanceOf(Hotel).isRequired,
  totalPages: PropTypes.number.isRequired,
  totalResults: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  pageChanged: PropTypes.func.isRequired,
  loguot: PropTypes.func.isRequired,
  submit: PropTypes.func.isRequired,
  searchHotels: PropTypes.func.isRequired,
  pageSizeChanged: PropTypes.func.isRequired,
  deleteHotel: PropTypes.func.isRequired,
  updateHotel: PropTypes.func.isRequired,
  createHotel: PropTypes.func.isRequired,
  createRoom: PropTypes.func.isRequired,
  updateRoom: PropTypes.func.isRequired,
  deleteRoom: PropTypes.func.isRequired,
  createService: PropTypes.func.isRequired,
  updateService: PropTypes.func.isRequired,
  deleteService: PropTypes.func.isRequired,
  updateUser: PropTypes.func.isRequired,
};

export default Routes;
