import React, { useState } from 'react';
import {
  Paper,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableFooter,
  TablePagination,
} from '@material-ui/core';
import PropTypes from 'prop-types';
import ReservationBriefResponse from '../../Models/ReservationBriefResponse';
import OrdersTableRow from './OrdersTableRow';
import BaseDialog from '../../Common/BaseDialog';
import DetailedOrder from '../DetailedOrder/DetailedOrder';

const OrdersTableComponent = ({
  reservations,
  totalResults,
  pageNumber,
  pageSize,
  onPageChanged,
  onPageSizeChanged,
}) => {
  const [openDetailed, setOpenDetailed] = useState(false);
  const [selectedReservationId, setSelectedReservationId] = useState(null);

  const handleSelectedReservationChanged = (reservationId) => {
    setSelectedReservationId(reservationId);
    setOpenDetailed(true);
  };

  const handleChangePage = (event, newPage) => {
    onPageChanged(newPage + 1);
  };

  const handleChangePageSize = (event) => {
    const newSize = parseInt(event.target.value, 10);

    onPageChanged(1);
    onPageSizeChanged(newSize);
  };

  return (
    <>
      <TableContainer component={Paper} variant="outlined">
        <Table size="small">
          <colgroup>
            <col width="auto" />
            <col width="10%" />
            <col width="5%" />
            <col width="10%" />
            <col width="2.5%" />
          </colgroup>
          <TableHead>
            <TableRow>
              <TableCell>Hotel</TableCell>
              <TableCell>Date-in</TableCell>
              <TableCell>Total nights</TableCell>
              <TableCell>Total price</TableCell>
              <TableCell />
            </TableRow>
          </TableHead>
          <TableBody>
            {reservations || reservations.lenght > 0
              ? reservations.map((reservation) => (
                  <OrdersTableRow
                    key={reservation.id}
                    reservation={reservation}
                    selectedReservationChanged={
                      handleSelectedReservationChanged
                    }
                  />
                ))
              : 'Loading'}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                rowsPerPage={pageSize}
                count={totalResults}
                page={pageNumber - 1}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangePageSize}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
      {selectedReservationId ? (
        <BaseDialog
          open={openDetailed}
          close={() => setOpenDetailed(false)}
          title="Details of reservation"
        >
          <DetailedOrder reservationId={selectedReservationId} />
        </BaseDialog>
      ) : null}
    </>
  );
};

OrdersTableComponent.propTypes = {
  reservations: PropTypes.arrayOf(ReservationBriefResponse),
  totalResults: PropTypes.number.isRequired,
  pageNumber: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  onPageChanged: PropTypes.func.isRequired,
  onPageSizeChanged: PropTypes.func.isRequired,
};

OrdersTableComponent.defaultProps = {
  reservations: [],
};

export default OrdersTableComponent;
