import React from 'react';
import PropTypes from 'prop-types';
import {
  Table,
  TableContainer,
  TableHead,
  TableBody,
  TableCell,
  Paper,
} from '@material-ui/core';
import RoomView from '../../../Models/RoomView';

const RoomViewTableComponent = ({ roomViews }) => {
  return (
    <>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableCell>Id</TableCell>
            <TableCell>Name</TableCell>s
            <TableCell />
          </TableHead>
          <TableBody />
        </Table>
      </TableContainer>
    </>
  );
};

RoomViewTableComponent.propTypes = {
  roomViews: PropTypes.arrayOf(RoomView).isRequired,
};

export default RoomViewTableComponent;
