import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import RoomDetailedComponent from './RoomDetailedComponent';
import Room from '../../Models/Room';
import RoomRequests from '../../api/RoomRequests';

const { getRoom } = RoomRequests;

const RoomDetailed = ({ roomId }) => {
  const [room, setRoom] = useState(null);

  const requestRoomAsync = async () => {
    const response = await getRoom(roomId);

    if (response) {
      setRoom(new Room(response));
    }
  };

  useEffect(async () => {
    await requestRoomAsync();
  }, [roomId]);

  return room ? <RoomDetailedComponent room={room} /> : null;
};

RoomDetailed.propTypes = {
  roomId: PropTypes.string.isRequired,
};

export default RoomDetailed;
