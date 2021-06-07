import React from 'react';
import { makeStyles, TableCell } from '@material-ui/core';
import PropTypes from 'prop-types';
import Hotel from '../../../Models/Hotel';

const useStyles = makeStyles(() => ({
  smallCell: {
    flexGrow: 0.1,
  },
  cell: {
    flexGrow: 1,
  },
}));

const HotelRowMap = ({ hotel }) => {
  const classes = useStyles();

  return (
    <>
      <TableCell>{hotel.id}</TableCell>
      <TableCell>{hotel.name}</TableCell>
      <TableCell>{hotel.numberFloors}</TableCell>
      <TableCell>{hotel.deposit}</TableCell>
      <TableCell>{hotel.location.country}</TableCell>
      <TableCell>{hotel.location.region}</TableCell>
      <TableCell>{hotel.location.city}</TableCell>
      <TableCell
        className={classes.smallCell}
      >{`${hotel.location.street}, ${hotel.location.buildingNumber}`}</TableCell>
    </>
  );
};

HotelRowMap.propTypes = {
  hotel: PropTypes.instanceOf(Hotel).isRequired,
};

export default HotelRowMap;
