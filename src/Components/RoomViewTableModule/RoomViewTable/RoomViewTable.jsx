import React from 'react';
import PropTypes from 'prop-types';
import RoomView from '../../../Models/RoomView';
import RoomViewTableComponent from './RoomViewTableComponent';

const RoomViewTable = ({
  role,
  roomViews,
  onError,
  onSuccess,
  createRoomView,
  updateRoomView,
  deleteRoomView,
}) => {
  return (
    <RoomViewTableComponent
      role={role}
      roomViews={roomViews}
      onError={onError}
      onSuccess={onSuccess}
      createRoomView={createRoomView}
      updateRoomView={updateRoomView}
      deleteRoomView={deleteRoomView}
    />
  );
};

RoomViewTable.propTypes = {
  role: PropTypes.string.isRequired,
  roomViews: PropTypes.arrayOf(RoomView),
  onError: PropTypes.func.isRequired,
  onSuccess: PropTypes.func.isRequired,
  createRoomView: PropTypes.func.isRequired,
  updateRoomView: PropTypes.func.isRequired,
  deleteRoomView: PropTypes.func.isRequired,
};

RoomViewTable.defaultProps = {
  roomViews: [],
};

export default RoomViewTable;
