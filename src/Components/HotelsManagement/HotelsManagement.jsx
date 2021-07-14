import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import HotelsManagementComponent from './HotelsManagementComponent';
import Hotel from '../../Models/Hotel';
import User from '../../Models/User';
import API from '../../Common/API';
import ManagementService from '../../Common/ManagementService';
import Constants from '../../Common/Constants';
import RoomView from '../../Models/RoomView';

const HotelsManagement = ({ isOpen, close, loggedUser }) => {
  const [users, setUsers] = useState([]);
  const [hotels, setHotels] = useState([]);
  const [roomViews, setRoomViews] = useState([]);
  const [totalResults, setTotalResults] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const requestUsers = async () => {
    const response = await API.getAllUsers();

    if (response) {
      const respondedUsers = response.map((item) => new User(item));
      setUsers(respondedUsers);
    }
  };

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
      if (pageNumber !== response.pageNumber) {
        setPageNumber(response.pageNumber);
      }
      if (pageSize !== response.pageSize) {
        setPageSize(response.pageSize);
      }
    }
  };

  const requestRoomViews = async () => {
    const response = await API.getRoomViews();

    if (response != null) {
      const respondedRoomViews = response.map((item) => new RoomView(item));

      setRoomViews(respondedRoomViews);
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

  const handleCreateHotelImage = async (createdImage) => {
    const error = await ManagementService.handleCreateHotelImage(createdImage);

    if (!error) {
      await requestHotels();
      // await refreshHotels();
      // await refreshUsers();
    }

    return error;
  };

  const handleDeleteHotelImage = async (deletedImageId) => {
    const error = await ManagementService.handleDeleteHotelImage(
      deletedImageId
    );

    if (!error) {
      await requestHotels();
      // await refreshHotels();
      // await refreshUsers();
    }

    return error;
  };

  const handleCreateRoomImage = async (createdImage) => {
    const error = await ManagementService.handleCreateRoomImage(createdImage);

    // eslint-disable-next-line no-debugger
    debugger;
    if (!error) {
      await requestHotels();
      // await refreshHotels();
      // await refreshUsers();
    }

    return error;
  };

  const handleDeleteRoomImage = async (deletedImageId) => {
    const error = await ManagementService.handleDeleteRoomImage(deletedImageId);

    if (!error) {
      await requestHotels();
      // await refreshHotels();
      // await refreshUsers();
    }

    return error;
  };

  const handleCreateRoomView = async (createdRoomView) => {
    const [response, error] = await ManagementService.baseRequestHandler(
      ManagementService.handleCreateRoomView,
      createdRoomView
    );

    if (!error) {
      await requestRoomViews();
    }

    return [response, error];
  };

  const handleUpdateRoomView = async (updatedRoomView) => {
    const [response, error] = await ManagementService.baseRequestHandler(
      ManagementService.handleUpdateRoomView,
      updatedRoomView
    );

    if (!error) {
      await requestRoomViews();
    }

    return [response, error];
  };

  const handleDeleteRoomView = async (deleteRoomViewId) => {
    const [response, error] = await ManagementService.baseRequestHandler(
      ManagementService.handleDeleteRoomView,
      deleteRoomViewId
    );

    if (!error) {
      await requestRoomViews();
    }

    return [response, error];
  };

  useEffect(async () => {
    await requestHotels();
  }, [pageSize, pageNumber]);

  useEffect(async () => {
    await requestRoomViews();

    if (getRole(loggedUser) === Constants.adminRole) {
      await requestUsers();
    }
  }, []);

  return (
    <HotelsManagementComponent
      role={getRole(loggedUser)}
      users={users}
      roomViews={roomViews}
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
      createImage={handleCreateHotelImage}
      deleteImage={handleDeleteHotelImage}
      createRoomImage={handleCreateRoomImage}
      deleteRoomImage={handleDeleteRoomImage}
      createRoomView={handleCreateRoomView}
      updateRoomView={handleUpdateRoomView}
      deleteRoomView={handleDeleteRoomView}
    />
  );
};

HotelsManagement.propTypes = {
  // users: PropTypes.arrayOf(User).isRequired,
  isOpen: PropTypes.bool.isRequired,
  close: PropTypes.func.isRequired,
  loggedUser: PropTypes.instanceOf(User).isRequired,
};

export default HotelsManagement;
