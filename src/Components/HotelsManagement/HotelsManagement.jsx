import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import HotelsManagementComponent from './HotelsManagementComponent';
import Hotel from '../../Models/Hotel';
import User from '../../Models/User';
import ManagementService from '../../Common/ManagementService';
import Constants from '../../Common/Constants';
import RoomView from '../../Models/RoomView';
import SearchClause from '../../Common/BaseSearch/SearchClause';
import SearchRange from '../../Common/BaseSearch/SearchRange';
import UserRequests from '../../api/UserRequests';
import HotelRequests from '../../api/HotelRequests';
import RoomViewRequests from '../../api/RoomViewRequests';

const { getAllUsers } = UserRequests;
const { getHotels, getHotelSearchPrompts } = HotelRequests;
const { getRoomViews } = RoomViewRequests;

const HotelsManagement = ({ isOpen, close }) => {
  const [users, setUsers] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [hotels, setHotels] = useState([]);
  const [searchVariants, setSearchVariants] = useState([]);
  const [roomViews, setRoomViews] = useState([]);
  const [totalResults, setTotalResults] = useState(0);
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [viewsTotalResults, setViewsTotalResults] = useState(0);
  const [viewsPageNumber, setViewsPageNumber] = useState(1);
  const [viewsPageSize, setViewsPageSize] = useState(10);
  const [searchClauses, setSearchClauses] = useState([
    new SearchClause({
      name: 'Hotel name',
      value: '',
      getOptionValue: (option) => option.name,
      getOptionLabel: (option) =>
        `${option.name} (${option.country}, ${option.city})`,
    }),
    new SearchClause({
      name: 'City',
      value: '',
      getOptionValue: (option) => option.city,
      getOptionLabel: (option) =>
        `${option.city} ("${option.name}", ${option.country})`,
    }),
    new SearchClause({
      name: 'Services',
      value: [],
      multiple: true,
      noOptions: true,
    }),
  ]);

  const [searchRanges, setSearchRanges] = useState([
    new SearchRange(
      'Deposit in USD',
      null,
      null,
      (value) => `$${value}`,
      0,
      100000
    ),
    new SearchRange('Number floors', null, null, null, 0, 100000),
  ]);

  const loggedUser = useSelector((state) => state.loggedUser.loggedUser);

  const handleChangeSearchClauses = (newClauses) => {
    setSearchClauses(newClauses);
  };

  const handleChangeSearchRanges = (newRanges) => {
    setSearchRanges(newRanges);
  };

  const handleSearch = () => {
    setPageNumber(0);
    setRefresh(!refresh);
  };

  const requestUsers = async () => {
    const response = await getAllUsers();

    if (response) {
      const respondedUsers = response.map((item) => new User(item));
      setUsers(respondedUsers);
    }
  };

  const requestHotels = async () => {
    const response = await getHotels({
      pageNumber,
      pageSize,
      dateIn: '',
      dateOut: '',
      manager: loggedUser.roles.includes(Constants.adminRole)
        ? ''
        : loggedUser.id,
      name: searchClauses[0].value,
      city: searchClauses[1].value,
      services: searchClauses[2].value,
      minDeposit: searchRanges[0].value[0],
      maxDeposit: searchRanges[0].value[1],
      minFloors: searchRanges[1].value[0],
      maxFloors: searchRanges[1].value[1],
    });

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

  const requestSearchVariants = async () => {
    const response = await getHotelSearchPrompts({
      dateIn: '',
      dateOut: '',
      manager: loggedUser.roles.includes(Constants.adminRole)
        ? ''
        : loggedUser.id,
      name: searchClauses[0].value,
      city: searchClauses[1].value,
      services: searchClauses[2].value,
      minDeposit: searchRanges[0].value[0],
      maxDeposit: searchRanges[0].value[1],
      minFloors: searchRanges[1].value[0],
      maxFloors: searchRanges[1].value[1],
    });

    setSearchVariants(response);
  };

  const requestRoomViews = async () => {
    const response = await getRoomViews({
      pageNumber: viewsPageNumber,
      pageSize: viewsPageSize,
    });

    if (response != null) {
      const respondedRoomViews = response.content.map(
        (item) => new RoomView(item)
      );

      setRoomViews(respondedRoomViews);
      setViewsTotalResults(response.totalResults);
      if (viewsPageNumber !== response.pageNumber) {
        setViewsPageNumber(response.pageNumber);
      }
      if (viewsPageSize !== response.pageSize) {
        setViewsPageSize(response.pageSize);
      }
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
    }

    return [response, error];
  };

  const handleCreateHotelImage = async (createdImage) => {
    const error = await ManagementService.handleCreateHotelImage(createdImage);

    if (!error) {
      await requestHotels();
    }

    return error;
  };

  const handleDeleteHotelImage = async (deletedImageId) => {
    const error = await ManagementService.handleDeleteHotelImage(
      deletedImageId
    );

    if (!error) {
      await requestHotels();
    }

    return error;
  };

  const handleCreateRoomImage = async (createdImage) => {
    const error = await ManagementService.handleCreateRoomImage(createdImage);

    if (!error) {
      await requestHotels();
    }

    return error;
  };

  const handleDeleteRoomImage = async (deletedImageId) => {
    const error = await ManagementService.handleDeleteRoomImage(deletedImageId);

    if (!error) {
      await requestHotels();
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
  }, [pageSize, pageNumber, refresh]);

  useEffect(async () => {
    await requestRoomViews();
  }, [viewsPageSize, viewsPageNumber]);

  useEffect(async () => {
    await requestRoomViews();

    if (getRole(loggedUser) === Constants.adminRole) {
      await requestUsers();
    }
  }, []);

  useEffect(async () => {
    if (searchClauses[0].value) {
      await requestSearchVariants();
    } else {
      setSearchVariants([]);
    }
  }, [searchClauses, searchRanges]);

  return (
    <HotelsManagementComponent
      role={getRole(loggedUser)}
      users={users}
      roomViews={roomViews}
      prompts={searchVariants}
      isOpen={isOpen}
      close={close}
      hotels={hotels}
      onSearch={handleSearch}
      clauses={searchClauses}
      ranges={searchRanges}
      onChangeClauses={handleChangeSearchClauses}
      onChangeRanges={handleChangeSearchRanges}
      totalCount={totalResults}
      pageChanged={handlePageChanged}
      pageSizeChanged={handlePageSizeChanged}
      pageSize={pageSize}
      viewsTotalCount={viewsTotalResults}
      viewsPageSize={viewsPageSize}
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
  isOpen: PropTypes.bool.isRequired,
  close: PropTypes.func.isRequired,
};

export default HotelsManagement;
