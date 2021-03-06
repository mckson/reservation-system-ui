import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles, TableCell } from '@material-ui/core';
import Hotel from '../../../Models/Hotel';
import defaultImage from '../../../images/default.png';

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
      <TableCell align="right">{hotel.numberFloors}</TableCell>
      <TableCell align="right">${hotel.deposit}</TableCell>
      <TableCell>{hotel.location.country}</TableCell>
      <TableCell>{hotel.location.region}</TableCell>
      <TableCell>{hotel.location.city}</TableCell>
      <TableCell
        className={classes.smallCell}
      >{`${hotel.location.street}, ${hotel.location.buildingNumber}`}</TableCell>
      <TableCell>
        <img
          style={{ width: 100 }}
          src={hotel.mainImage ? `${hotel.mainImage}` : defaultImage}
          alt="hotel"
        />
      </TableCell>
    </>
  );
};

HotelRowMap.propTypes = {
  hotel: PropTypes.instanceOf(Hotel).isRequired,
};

export default HotelRowMap;
