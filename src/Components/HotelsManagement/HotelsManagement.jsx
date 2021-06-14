import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import HotelsManagementComponent from './HotelsManagementComponent';
import Hotel from '../../Models/Hotel';
import User from '../../Models/User';
import API from '../../Common/API';
import ManagementService from '../../Common/ManagementService';

const HotelsManagement = ({
  users,
  isOpen,
  close,
  // hotels,
  // totalCount,
  // pageChanged,
  // pageSizeChanged,
  // deleteHotel,
  // updateHotel,
  // createHotel,
  // createRoom,
  // updateRoom,
  // deleteRoom,
  // createService,
  // updateService,
  // deleteService,
  // updateUser,
  // createImage,
  // deleteImage,
  // pageSize,
}) => {
  const [hotels, setHotels] = useState([]);
  const [totalResults, setTotalResults] = useState(null);
  const [pageNumber, setPageNumber] = useState(0);
  const [pageSize, setPageSize] = useState(10);

  const requestHotels = async () => {
    const response = await API.getHotels(pageNumber, pageSize);

    if (response != null) {
      const respondedHotels = response.content.map((item) => new Hotel(item));

      setHotels(respondedHotels);
      setTotalResults(response.totalResults);
      setPageNumber(response.pageNumber);
      setPageSize(response.pageSize);
    }
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
    const error = await ManagementService.baseRequestHandler(
      ManagementService.handleCreateHotel,
      createdHotel
    );

    if (!error) {
      await requestHotels();
    }

    return error;
  };

  const handleUpdateHotel = async (updatedHotel) => {
    const error = await ManagementService.baseRequestHandler(
      ManagementService.handleUpdateHotel,
      updatedHotel
    );

    if (!error) {
      await requestHotels();
    }

    return error;
  };

  const handleDeleteHotel = async (deletedHotelId) => {
    const error = await ManagementService.baseRequestHandler(
      ManagementService.handleDeleteHotel,
      deletedHotelId
    );

    if (!error) {
      await requestHotels();
    }

    return error;
  };

  const handleCreateRoom = async (createdRoom) => {
    const error = await ManagementService.baseRequestHandler(
      ManagementService.handleCreateRoom,
      createdRoom
    );

    if (!error) {
      await requestHotels();
    }

    return error;
  };

  const handleUpdateRoom = async (updatedRoom) => {
    const error = await ManagementService.baseRequestHandler(
      ManagementService.handleUpdateRoom,
      updatedRoom
    );

    if (!error) {
      await requestHotels();
    }

    return error;
  };

  const handleDeleteRoom = async (deletedRoomId) => {
    const error = await ManagementService.baseRequestHandler(
      ManagementService.handleDeleteRoom,
      deletedRoomId
    );

    if (!error) {
      await requestHotels();
    }

    return error;
  };

  const handleCreateService = async (createdService) => {
    const error = await ManagementService.baseRequestHandler(
      ManagementService.handleCreateService,
      createdService
    );

    if (!error) {
      await requestHotels();
    }

    return error;
  };

  const handleUpdateService = async (updatedService) => {
    const error = await ManagementService.baseRequestHandler(
      ManagementService.handleUpdateService,
      updatedService
    );

    if (!error) {
      await requestHotels();
    }

    return error;
  };

  const handleDeleteService = async (deleteServiceId) => {
    const error = await ManagementService.baseRequestHandler(
      ManagementService.handleDeleteService,
      deleteServiceId
    );

    if (!error) {
      await requestHotels();
    }

    return error;
  };

  const handleUpdateUser = async (updatedUser) => {
    const error = await ManagementService.baseRequestHandler(
      ManagementService.handleUpdateUser,
      updatedUser
    );

    if (!error) {
      await requestHotels();
      // await refreshUSers()
    }

    return error;
  };

  return (
    <HotelsManagementComponent
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
      createImage={ManagementService.handleCreateImage}
      deleteImage={ManagementService.handleDeleteImage}
    />
  );
};

HotelsManagement.propTypes = {
  users: PropTypes.arrayOf(User).isRequired,
  isOpen: PropTypes.bool.isRequired,
  close: PropTypes.func.isRequired,
  // hotels: PropTypes.arrayOf(Hotel).isRequired,
  // totalCount: PropTypes.number.isRequired,
  // pageChanged: PropTypes.func.isRequired,
  // pageSizeChanged: PropTypes.func.isRequired,
  // pageSize: PropTypes.number.isRequired,
  // deleteHotel: PropTypes.func.isRequired,
  // updateHotel: PropTypes.func.isRequired,
  // createHotel: PropTypes.func.isRequired,
  // createRoom: PropTypes.func.isRequired,
  // updateRoom: PropTypes.func.isRequired,
  // deleteRoom: PropTypes.func.isRequired,
  // createService: PropTypes.func.isRequired,
  // updateService: PropTypes.func.isRequired,
  // deleteService: PropTypes.func.isRequired,
  // updateUser: PropTypes.func.isRequired,
  // createImage: PropTypes.func.isRequired,
  // deleteImage: PropTypes.func.isRequired,
};

export default HotelsManagement;
