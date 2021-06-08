import React, { useState } from 'react';
import PropTypes from 'prop-types';
import AddManagerForm from './AddManagerForm';
import Hotel from '../../../Models/Hotel';
import User from '../../../Models/User';

const AddManagerComponent = ({ open, close, hotel, updateUser, users }) => {
  const [error, setError] = useState(null);

  const managerRole = 'manager';
  const formTitle = `Add manager to hotel ${hotel.name}`;
  const formSubmittext = 'Add manager';

  const onUpdateUserAsync = async (user) => {
    // eslint-disable-next-line no-debugger
    debugger;
    // eslint-disable-next-line no-param-reassign
    user.hotelId = hotel.id;
    user.roles.push(managerRole);

    // eslint-disable-next-line no-debugger
    debugger;

    const errorResponse = await updateUser(user);

    if (errorResponse != null) {
      setError(errorResponse);
    } else {
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
};

export default AddManagerComponent;
