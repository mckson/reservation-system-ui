import React, { useState } from 'react';
import PropTypes from 'prop-types';
import AddManagerForm from './AddManagerForm';
import Hotel from '../../../Models/Hotel';
import User from '../../../Models/User';

const AddManagerComponent = ({
  open,
  close,
  hotel,
  updateUser,
  users,
  onSuccess,
}) => {
  const [error, setError] = useState(null);

  const managerRole = 'manager';
  const formTitle = `Add manager to hotel ${hotel.name}`;
  const formSubmittext = 'Add manager';
  let errorResponse = null;
  const onUpdateUserAsync = async (user) => {
    // eslint-disable-next-line no-param-reassign
    if (
      user.hotels == null ||
      user.hotels === [] ||
      !user.hotels?.includes(hotel.id)
    ) {
      if (user.hotels == null) {
        // eslint-disable-next-line no-param-reassign
        user.hotels = [];
      }
      user.hotels.push(hotel.id);
      user.roles.push(managerRole);

      errorResponse = await updateUser(user);
    } else {
      errorResponse = 'User is already manager of current hotel';
    }

    if (errorResponse != null) {
      setError(errorResponse);
    } else {
      onSuccess('Manager successfully added');
      close();
    }
  };

  const handleResetError = () => {
    setError(null);
  };

  return (
    <AddManagerForm
      open={open}
      close={close}
      users={users}
      title={formTitle}
      submitHandler={onUpdateUserAsync}
      submitText={formSubmittext}
      error={error}
      resetError={handleResetError}
    />
  );
};

AddManagerComponent.propTypes = {
  open: PropTypes.bool.isRequired,
  close: PropTypes.func.isRequired,
  hotel: PropTypes.instanceOf(Hotel).isRequired,
  updateUser: PropTypes.func.isRequired,
  users: PropTypes.arrayOf(User).isRequired,
  onSuccess: PropTypes.func.isRequired,
};

export default AddManagerComponent;
