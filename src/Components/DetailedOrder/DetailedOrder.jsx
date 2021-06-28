import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import DetailedOrderComponent from './DetailedOrderComponent';
import API from '../../Common/API';
import ReservationDetailedResponse from '../../Models/ReservationDetailedResponse';

const DetailedOrder = ({ reservationId }) => {
  const [reservation, setReservation] = useState(null);
  const requestReservationAsync = async () => {
    const response = await API.getReservation(reservationId);

    if (response) {
      setReservation(new ReservationDetailedResponse(response));
    }
  };

  useEffect(async () => {
    await requestReservationAsync(reservationId);
  }, [reservationId]);
  return reservation ? (
    <DetailedOrderComponent reservation={reservation} />
  ) : null;
};

DetailedOrder.propTypes = {
  reservationId: PropTypes.string.isRequired,
};

export default DetailedOrder;
