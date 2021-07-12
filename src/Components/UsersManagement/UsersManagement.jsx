import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import User from '../../Models/User';
import UsersManagementComponent from './UsersManagementComponent';
import ManagementService from '../../Common/ManagementService';
import API from '../../Common/API';

const UsersManagement = ({ isOpen, close, loggedUser }) => {
  const [users, setUsers] = useState([]);
  const [totalResults, setTotalResults] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const requestUsers = async () => {
    const response = await API.getUsers(pageNumber, pageSize, '');

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
  }, [pageSize, pageNumber]);

  return (
    <UsersManagementComponent
      users={users}
      isOpen={isOpen}
      close={close}
      loggedUser={loggedUser}
      createUser={handleCreateUser}
      updateUser={handleUpdateUser}
      deleteUser={handleDeleteUser}
      totalCount={totalResults}
      pageChanged={handlePageChanged}
      pageSizeChanged={handlePageSizeChanged}
      pageSize={pageSize}
    />
  );
};

UsersManagement.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  close: PropTypes.func.isRequired,
  loggedUser: PropTypes.instanceOf(User).isRequired,
};

export default UsersManagement;
