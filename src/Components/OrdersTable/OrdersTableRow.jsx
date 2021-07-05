import React from 'react';
import PropTypes from 'prop-types';
import { TableRow, TableCell, IconButton } from '@material-ui/core';
import { InfoOutlined } from '@material-ui/icons';
import ReservationBriefResponse from '../../Models/ReservationBriefResponse';
import OrdersTableRowMap from './OrdersTableRowMap';

const OrdersTableRow = ({ reservation, selectedReservationChanged }) => {
  return (
    <>
      <TableRow>
        <OrdersTableRowMap reservation={reservation} />
        <TableCell>
          <IconButton
            onClick={() => selectedReservationChanged(reservation.id)}
          >
            <InfoOutlined />
          </IconButton>
        </TableCell>
      </TableRow>
    </>
  );
};

OrdersTableRow.propTypes = {
  reservation: PropTypes.instanceOf(ReservationBriefResponse).isRequired,
  selectedReservationChanged: PropTypes.func.isRequired,
};

export default OrdersTableRow;
