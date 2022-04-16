import React from 'react';
import PropTypes from 'prop-types';
import { TableCell } from '@material-ui/core';
import RoomView from '../../../Models/RoomView';

const RoomViewRowMapComponent = ({ roomView }) => {
  return (
    <>
      <TableCell>{roomView.id}</TableCell>
      <TableCell>{roomView.name}</TableCell>
    </>
  );
};

RoomViewRowMapComponent.propTypes = {
  roomView: PropTypes.instanceOf(RoomView).isRequired,
};

export default RoomViewRowMapComponent;
