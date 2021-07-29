import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import DetailedOrderComponent from './DetailedOrderComponent';
import ReservationDetailedResponse from '../../Models/ReservationDetailedResponse';
import ReservationRequests from '../../api/ReservationRequests';

const { getReservation } = ReservationRequests;

const DetailedOrder = ({ reservationId }) => {
  const [reservation, setReservation] = useState(null);
  const [roomId, setRoomId] = useState(null);
  const [openRoom, setOpenRoom] = useState(false);

  const requestReservationAsync = async () => {
    const response = await getReservation(reservationId);

    if (response) {
      setReservation(new ReservationDetailedResponse(response));
    }
  };

  const handleSelectedRoomChanged = (selectedRoomId) => {
    setRoomId(selectedRoomId);
  };

  const handleOpenRoomDetailed = () => {
    setOpenRoom(true);
  };

  const handleCloseRoomDetailed = () => {
    setOpenRoom(false);
    setRoomId(null);
  };

  useEffect(async () => {
    await requestReservationAsync(reservationId);
  }, [reservationId]);
  return reservation ? (
    <DetailedOrderComponent
      reservation={reservation}
      selectedRoomId={roomId}
      isRoomDetailedOpen={openRoom}
      selectedRoomChanged={handleSelectedRoomChanged}
      closeRoomDetailed={handleCloseRoomDetailed}
      openRoomDetailed={handleOpenRoomDetailed}
    />
  ) : null;
};

DetailedOrder.propTypes = {
  reservationId: PropTypes.string.isRequired,
};

export default DetailedOrder;
