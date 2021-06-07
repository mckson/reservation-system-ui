import React from 'react';
import PropTypes from 'prop-types';
import Hotel from '../../../Models/Hotel';
import HotelRowComponent from './HotelRowComponent';

const HotelRow = ({ hotel, deleteHotel, updateHotel, createRoom }) => {
  return (
    <HotelRowComponent
      hotel={hotel}
      deleteHotel={deleteHotel}
      updateHotel={updateHotel}
      createRoom={createRoom}
    />
  );
};

HotelRow.propTypes = {
  hotel: PropTypes.instanceOf(Hotel).isRequired,
  deleteHotel: PropTypes.func.isRequired,
  updateHotel: PropTypes.func.isRequired,
  createRoom: PropTypes.func.isRequired,
};

export default HotelRow;
