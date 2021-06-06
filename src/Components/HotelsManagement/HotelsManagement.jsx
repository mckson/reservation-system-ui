import React from 'react';
import PropTypes from 'prop-types';
import HotelsManagementComponent from './HotelsManagementComponent';
import Hotel from '../../Models/Hotel';

const HotelsManagement = ({
  isOpen,
  close,
  hotels,
  totalCount,
  pageChanged,
  pageSizeChanged,
  deleteHotel,
  updateHotel,
  createHotel,
  createRoom,
  pageSize,
}) => {
  return (
    <HotelsManagementComponent
      isOpen={isOpen}
      close={close}
      hotels={hotels}
      totalCount={totalCount}
      pageChanged={pageChanged}
      pageSizeChanged={pageSizeChanged}
      pageSize={pageSize}
      deleteHotel={deleteHotel}
      updateHotel={updateHotel}
      createHotel={createHotel}
      createRoom={createRoom}
    />
  );
};

HotelsManagement.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  close: PropTypes.func.isRequired,
  hotels: PropTypes.arrayOf(Hotel).isRequired,
  totalCount: PropTypes.number.isRequired,
  pageChanged: PropTypes.func.isRequired,
  pageSizeChanged: PropTypes.func.isRequired,
  pageSize: PropTypes.number.isRequired,
  deleteHotel: PropTypes.func.isRequired,
  updateHotel: PropTypes.func.isRequired,
  createHotel: PropTypes.func.isRequired,
  createRoom: PropTypes.func.isRequired,
};

export default HotelsManagement;
