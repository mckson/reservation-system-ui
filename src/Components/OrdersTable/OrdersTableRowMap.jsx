import React from 'react';
import PropTypes from 'prop-types';
import { TableCell } from '@material-ui/core';
import ReservationBriefResponse from '../../Models/ReservationBriefResponse';
import Constants from '../../Common/Constants';

const OrdersTableRowMap = ({ reservation }) => {
  return (
    <>
      <TableCell>{reservation.hotelName}</TableCell>
      <TableCell>
        {reservation.dateIn.toLocaleDateString('en-US', Constants.dateOptions)}
      </TableCell>
      <TableCell>{reservation.totalNights}</TableCell>
      <TableCell>${reservation.totalPrice}</TableCell>
    </>
  );
};

OrdersTableRowMap.propTypes = {
  reservation: PropTypes.instanceOf(ReservationBriefResponse).isRequired,
};

export default OrdersTableRowMap;
