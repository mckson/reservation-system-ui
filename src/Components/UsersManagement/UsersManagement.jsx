import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import User from '../../Models/User';
import HotelBrief from '../../Models/HotelBrief';
import UsersManagementComponent from './UsersManagementComponent';
import ManagementService from '../../Common/ManagementService';
import UserBrief from '../../Models/UserBrief';
import SearchClause from '../../Common/BaseSearch/SearchClause';
import Constants from '../../Common/Constants';
import UserRequests from '../../api/UserRequests';
import HotelRequests from '../../api/HotelRequests';

const { getUsers, getAllUsers, getUserSearchVariants } = UserRequests;
const { getAllBriefHotels } = HotelRequests;

const UsersManagement = ({ isOpen, close }) => {
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState(null);
  const [users, setUsers] = useState([]);
  const [searchVariants, setSearchVariants] = useState([]);
  const [usersBrief, setUsersBrief] = useState([]);
  const [totalResults, setTotalResults] = useState(0);
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [hotelsBrief, setHotelsBrief] = useState([]);
  const [searchClauses, setSearchClauses] = useState([
    new SearchClause({
      name: 'Email',
      value: '',
      getOptionValue: (option) => option.email,
      getOptionLabel: (option) => option.email,
    }),
    new SearchClause({
      name: 'Surname',
      value: '',
      getOptionValue: (option) => option.firstName,
      getOptionLabel: (option) =>
        `${option.firstName} ${option.lastName} (${option.email})`,
    }),
    new SearchClause({
      name: 'Name',
      value: '',
      getOptionValue: (option) => option.lastName,
      getOptionLabel: (option) =>
        `${option.firstName} ${option.lastName} (${option.email})`,
    }),
    new SearchClause({
      name: 'Roles',
      value: [],
      options: [Constants.adminRole, Constants.managerRole, Constants.userRole],
      multiple: true,
    }),
  ]);
  const [searchRanges, setSearchRanges] = useState([]);
  const [searchOptions, setSearchOptions] = useState([]);

  const [refresh, setRefresh] = useState(false);

  const handleOrderChanged = (newOrder) => {
    setOrderBy(newOrder.orderBy);
    setOrder(newOrder.order);
    setPageNumber(1);
    setRefresh(!refresh);
  };

  const requestSearchVariants = async () => {
    const response = await getUserSearchVariants({
      email: searchClauses[0].value,
      firstName: searchClauses[1].value,
      lastName: searchClauses[2].value,
      roles: searchClauses[3].value,
    });

    setSearchVariants(response);
  };

  const handleChangeSearchClauses = (newClauses) => {
    setSearchClauses(newClauses);
  };

  const handleChangeSearchRanges = (newRanges) => {
    setSearchRanges(newRanges);
  };

  const handleChangeSearchOptions = (newOptions) => {
    setSearchOptions(newOptions);
  };

  const handleSearch = () => {
    setPageNumber(0);
    setRefresh(!refresh);
  };

  const requestUsers = async () => {
    const response = await getUsers({
      pageNumber,
      pageSize,
      email: searchClauses[0].value,
      firstName: searchClauses[1].value,
      lastName: searchClauses[2].value,
      roles: searchClauses[3].value,
      propertyName: orderBy,
      isDescending: order === 'desc',
    });

    if (response) {
      const respondedUsers = response.content.map((item) => new User(item));

      setUsers(respondedUsers);
      setTotalResults(response.totalResults);
      if (pageNumber !== response.pageNumber) {
        setPageNumber(response.pageNumber);
      }
      if (pageSize !== response.pageSize) {
        setPageSize(response.pageSize);
      }
    }

    const respondedUsersBrief = await getAllUsers();
    const usersBriefBuffer = respondedUsersBrief.map(
      (user) => new UserBrief(user)
    );
    setUsersBrief(usersBriefBuffer);
  };

  const requestHotels = async () => {
    const response = await getAllBriefHotels();

    if (response) {
      const respondedHotels = response.map((hotel) => new HotelBrief(hotel));

      setHotelsBrief(respondedHotels);
    }
  };

  const handlePageChanged = (value) => {
    setPageNumber(value);
  };

  const handlePageSizeChanged = (newSize) => {
    setPageSize(newSize);
  };

  const handleCreateUser = async (creatingUser) => {
    const [response, error] = await ManagementService.baseRequestHandler(
      ManagementService.handleCreateUser,
      creatingUser
    );

    if (!error) {
      await requestUsers();
    }

    return [response, error];
  };

  const handleUpdateUser = async (updatingUser) => {
    const [response, error] = await ManagementService.baseRequestHandler(
      ManagementService.handleUpdateUser,
      updatingUser
    );

    if (!error) {
      await requestUsers();
    }

    return [response, error];
  };

  const handleDeleteUser = async (deletingUserId) => {
    const [response, error] = await ManagementService.baseRequestHandler(
      ManagementService.handleDeleteUser,
      deletingUserId
    );

    if (!error) {
      await requestUsers();
    }

    return [response, error];
  };

  useEffect(async () => {
    await requestUsers();
  }, [pageSize, pageNumber, refresh]);

  useEffect(async () => {
    await requestHotels();
  }, []);

  useEffect(async () => {
    if (
      searchClauses[0].value ||
      searchClauses[1].value ||
      searchClauses[2].value
    ) {
      await requestSearchVariants();
    } else {
      setSearchVariants([]);
    }
  }, [searchClauses, searchRanges]);

  return (
    <UsersManagementComponent
      clauses={searchClauses}
      options={searchOptions}
      ranges={searchRanges}
      searchVariants={searchVariants}
      onChangeClauses={handleChangeSearchClauses}
      onChangeOptions={handleChangeSearchOptions}
      onChangeRanges={handleChangeSearchRanges}
      onSearch={handleSearch}
      users={users}
      usersBrief={usersBrief}
      hotels={hotelsBrief}
      isOpen={isOpen}
      close={close}
      createUser={handleCreateUser}
      updateUser={handleUpdateUser}
      deleteUser={handleDeleteUser}
      totalCount={totalResults}
      pageChanged={handlePageChanged}
      pageSizeChanged={handlePageSizeChanged}
      pageSize={pageSize}
      onOrderChanged={handleOrderChanged}
      orderBy={orderBy}
      order={order}
    />
  );
};

UsersManagement.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  close: PropTypes.func.isRequired,
};

export default UsersManagement;
