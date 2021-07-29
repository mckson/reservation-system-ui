import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import OrdersSectionComponent from './OrdersSectionComponent';
import LoggedUser from '../../Models/LoggedUser';

const OrdersSection = ({ isOpen, close }) => {
  const user = useSelector((state) => state.loggedUser.loggedUser);

  return (
    <OrdersSectionComponent
      isOpen={isOpen}
      close={close}
      user={new LoggedUser(user)}
    />
  );
};

OrdersSection.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  close: PropTypes.func.isRequired,
};

export default OrdersSection;
