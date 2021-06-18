import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import HotelsManagementComponent from './HotelsManagementComponent';
import Hotel from '../../Models/Hotel';
import User from '../../Models/User';
import API from '../../Common/API';
import ManagementService from '../../Common/ManagementService';
import Constants from '../../Common/Constants';

const HotelsManagement = ({ users, isOpen, close, loggedUser }) => {
  const [hotels, setHotels] = useState([]);
  const [totalResults, setTotalResults] = useState(null);
  const [pageNumber, setPageNumber] = useState(0);
  const [pageSize, setPageSize] = useState(10);

  const requestHotels = async () => {
    const response = await API.getHotels(
      pageNumber,
      pageSize,
      '',
      '',
      loggedUser.roles.includes(Constants.adminRole) ? '' : loggedUser.id
    );

    if (response != null) {
      const respondedHotels = response.content.map((item) => new Hotel(item));

      setHotels(respondedHotels);
      setTotalResults(response.totalResults);
      setPageNumber(response.pageNumber);
      setPageSize(response.pageSize);
    }
  };

  const getRole = (user) => {
    if (user.roles.includes(Constants.adminRole)) {
      return Constants.adminRole;
    }

    if (user.roles.includes(Constants.managerRole)) {
      return Constants.managerRole;
    }

    return Constants.userRole;
  };

  const handlePageChanged = (value) => {
    setPageNumber(value);
  };

  const handlePageSizeChanged = (newSize) => {
    setPageSize(newSize);
  };

  useEffect(async () => {
    await requestHotels();
  }, [pageSize, pageNumber]);

  const handleCreateHotel = async (createdHotel) => {
    const [response, error] = await ManagementService.baseRequestHandler(
      ManagementService.handleCreateHotel,
      createdHotel
    );

    if (!error) {
      await requestHotels();
      // await refreshHotels();
    }

    return [response, error];
  };

  const handleUpdateHotel = async (updatedHotel) => {
    const [response, error] = await ManagementService.baseRequestHandler(
      ManagementService.handleUpdateHotel,
      updatedHotel
    );

    if (!error) {
      await requestHotels();
      // await refreshHotels();
    }

    return [response, error];
  };

  const handleDeleteHotel = async (deletedHotelId) => {
    const [response, error] = await ManagementService.baseRequestHandler(
      ManagementService.handleDeleteHotel,
      deletedHotelId
    );

    if (!error) {
      await requestHotels();
      // await refreshHotels();
    }

    return [response, error];
  };

  const handleCreateRoom = async (createdRoom) => {
    const [response, error] = await ManagementService.baseRequestHandler(
      ManagementService.handleCreateRoom,
      createdRoom
    );

    if (!error) {
      await requestHotels();
      // await refreshHotels();
    }

    return [response, error];
  };

  const handleUpdateRoom = async (updatedRoom) => {
    const [response, error] = await ManagementService.baseRequestHandler(
      ManagementService.handleUpdateRoom,
      updatedRoom
    );

    if (!error) {
      await requestHotels();
      // await refreshHotels();
    }

    return [response, error];
  };

  const handleDeleteRoom = async (deletedRoomId) => {
    const [response, error] = await ManagementService.baseRequestHandler(
      ManagementService.handleDeleteRoom,
      deletedRoomId
    );

    if (!error) {
      await requestHotels();
      // await refreshHotels();
    }

    return [response, error];
  };

  const handleCreateService = async (createdService) => {
    const [response, error] = await ManagementService.baseRequestHandler(
      ManagementService.handleCreateService,
      createdService
    );

    if (!error) {
      await requestHotels();
      // await refreshHotels();
    }

    return [response, error];
  };

  const handleUpdateService = async (updatedService) => {
    const [response, error] = await ManagementService.baseRequestHandler(
      ManagementService.handleUpdateService,
      updatedService
    );

    if (!error) {
      await requestHotels();
      // await refreshHotels();
    }

    return [response, error];
  };

  const handleDeleteService = async (deleteServiceId) => {
    const [response, error] = await ManagementService.baseRequestHandler(
      ManagementService.handleDeleteService,
      deleteServiceId
    );

    if (!error) {
      await requestHotels();
      // await refreshHotels();
    }

    return [response, error];
  };

  const handleUpdateUser = async (updatedUser) => {
    const [response, error] = await ManagementService.baseRequestHandler(
      ManagementService.handleUpdateUser,
      updatedUser
    );

    if (!error) {
      await requestHotels();
      // await refreshHotels();
      // await refreshUsers();
    }

    return [response, error];
  };

  const handleCreateImage = async (createdImage) => {
    const [response, error] = await ManagementService.baseRequestHandler(
      ManagementService.handleCreateImage,
      createdImage
    );

    if (!error) {
      await requestHotels();
      // await refreshHotels();
      // await refreshUsers();
    }

    return [response, error];
  };

  const handleDeleteImage = async (deletedImageId) => {
    const [response, error] = await ManagementService.baseRequestHandler(
      ManagementService.handleDeleteImage,
      deletedImageId
    );

    if (!error) {
      await requestHotels();
      // await refreshHotels();
      // await refreshUsers();
    }

    return [response, error];
  };

  return (
    <HotelsManagementComponent
      role={getRole(loggedUser)}
      users={users}
      isOpen={isOpen}
      close={close}
      hotels={hotels}
      totalCount={totalResults}
      pageChanged={handlePageChanged}
      pageSizeChanged={handlePageSizeChanged}
      pageSize={pageSize}
      createHotel={handleCreateHotel}
      updateHotel={handleUpdateHotel}
      deleteHotel={handleDeleteHotel}
      createRoom={handleCreateRoom}
      updateRoom={handleUpdateRoom}
      deleteRoom={handleDeleteRoom}
      createService={handleCreateService}
      updateService={handleUpdateService}
      deleteService={handleDeleteService}
      updateUser={handleUpdateUser}
      createImage={handleCreateImage}
      deleteImage={handleDeleteImage}
    />
  );
};

HotelsManagement.propTypes = {
  users: PropTypes.arrayOf(User).isRequired,
  isOpen: PropTypes.bool.isRequired,
  close: PropTypes.func.isRequired,
  loggedUser: PropTypes.instanceOf(User).isRequired,
};

export default HotelsManagement;
