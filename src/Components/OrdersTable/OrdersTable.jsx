import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import OrdersTableComponent from './OrdersTableComponent';
import ReservationBriefResponse from '../../Models/ReservationBriefResponse';
import LoggedUser from '../../Models/LoggedUser';
import ReservationRequests from '../../api/ReservationRequests';

const { getReservations } = ReservationRequests;

const OrdersTable = ({ user }) => {
  const [reservations, setReservatoins] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalResults, setTotalResults] = useState(0);

  const requestReservationsAsync = async () => {
    const response = await getReservations({
      pageNumber,
      pageSize,
      email: user.email,
    });

    if (response) {
      const respondedReservations = response.content.map(
        (item) => new ReservationBriefResponse(item)
      );

      setReservatoins(respondedReservations);
      setTotalResults(response.totalResults);
      if (response.pageNumber !== pageNumber) {
        setPageNumber(response.pageNumber);
      }
      if (response.pageSize !== pageSize) {
        setPageSize(response.pageSize);
      }
    }
  };

  const handlePageChanged = (newPage) => {
    setPageNumber(newPage);
  };

  const handlePageSizeChanged = (newPageSize) => {
    setPageSize(newPageSize);
  };

  useEffect(async () => {
    await requestReservationsAsync();
  }, [pageSize, pageNumber]);

  return (
    <OrdersTableComponent
      reservations={reservations}
      totalResults={totalResults}
      pageNumber={pageNumber}
      pageSize={pageSize}
      onPageChanged={handlePageChanged}
      onPageSizeChanged={handlePageSizeChanged}
    />
  );
};

OrdersTable.propTypes = {
  user: PropTypes.instanceOf(LoggedUser).isRequired,
};

export default OrdersTable;
