import React from 'react';
import PropTypes from 'prop-types';
import RoomView from '../../../Models/RoomView';
import RoomViewTableComponent from './RoomViewTableComponent';

const RoomViewTable = ({ roomViews }) => {
  return (
    <>
      {roomViews && roomViews.length > 0 ? (
        <RoomViewTableComponent roomViews={roomViews} />
      ) : (
        <div>No room views created</div>
      )}
    </>
  );
};

RoomViewTable.propTypes = {
  roomViews: PropTypes.arrayOf(RoomView),
};

RoomViewTable.defaultProps = {
  roomViews: [],
};

export default RoomViewTable;
