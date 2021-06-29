import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import RoomDetailedComponent from './RoomDetailedComponent';
import API from '../../Common/API';
import Room from '../../Models/Room';

const RoomDetailed = ({ roomId }) => {
  const [room, setRoom] = useState(null);

  const requestRoomAsync = async () => {
    const response = await API.getRoom(roomId);

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
