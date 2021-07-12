import React from 'react';
import PropTypes from 'prop-types';
import { IconButton, TableCell, TableRow } from '@material-ui/core';
import { DeleteOutlined, EditOutlined } from '@material-ui/icons';
import User from '../../../Models/User';
import UserRowMap from '../UserRowMap';

const UserRow = ({ user /* updateUser, deleteUser, onSuccess, onError */ }) => {
  return (
    <>
      <TableRow>
        <UserRowMap user={user} />
        <TableCell>
          <IconButton>
            <EditOutlined />
          </IconButton>
          <IconButton>
            <DeleteOutlined />
          </IconButton>
        </TableCell>
      </TableRow>
    </>
  );
};

UserRow.propTypes = {
  user: PropTypes.instanceOf(User).isRequired,
  //   updateUser: PropTypes.func.isRequired,
  //   deleteUser: PropTypes.func.isRequired,
  //   onSuccess: PropTypes.func.isRequired,
  //   onError: PropTypes.func.isRequired,
};

export default UserRow;
