import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { IconButton, TableCell, TableRow } from '@material-ui/core';
import { DeleteOutlined, EditOutlined } from '@material-ui/icons';
import User from '../../../Models/User';
import UserRowMap from '../UserRowMap';
import EditUserComponent from '../EditUserComponent';
import HotelBrief from '../../../Models/HotelBrief';

const UserRow = ({
  user,
  hotels,
  updateUser,
  deleteUser,
  onSuccess,
  onError,
}) => {
  const [isEdit, setIsEdit] = useState(false);

  const handleOpenEdit = () => {
    setIsEdit(true);
  };

  const handleCloseEdit = () => {
    setIsEdit(false);
  };

  return (
    <>
      <TableRow>
        <UserRowMap user={user} />
        <TableCell>
          <IconButton
            onClick={() => {
              handleOpenEdit();
              console.log(user);
            }}
          >
            <EditOutlined />
          </IconButton>
          <IconButton
            onClick={async () => {
              const [, errorResponse] = await deleteUser(user.id);

              if (errorResponse) {
                onError(errorResponse);
              } else {
                onSuccess(`User ${user.id} successfully deleted`);
              }
            }}
          >
            <DeleteOutlined />
          </IconButton>
        </TableCell>
      </TableRow>
      <EditUserComponent
        open={isEdit}
        close={handleCloseEdit}
        user={user}
        hotels={hotels}
        updateUser={updateUser}
        onSuccess={onSuccess}
      />
    </>
  );
};

UserRow.propTypes = {
  user: PropTypes.instanceOf(User).isRequired,
  hotels: PropTypes.arrayOf(HotelBrief),
  updateUser: PropTypes.func.isRequired,
  deleteUser: PropTypes.func.isRequired,
  onSuccess: PropTypes.func.isRequired,
  onError: PropTypes.func.isRequired,
};

UserRow.defaultProps = {
  hotels: [],
};

export default UserRow;
