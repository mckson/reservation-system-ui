import React from 'react';
import PropTypes from 'prop-types';
import HotelsTableComponent from './HotelsTableComponent';
import Hotel from '../../Models/Hotel';

const HotelsTable = ({
  hotels,
  totalCount,
  pageChanged,
  pageSize,
  pageSizeChanged,
  deleteHotel,
}) => {
  return (
    <HotelsTableComponent
      hotels={hotels}
      totalCount={totalCount}
      pageChanged={pageChanged}
      pageSize={pageSize}
      pageSizeChanged={pageSizeChanged}
      deleteHotel={deleteHotel}
    />
  );
};

HotelsTable.propTypes = {
  hotels: PropTypes.arrayOf(Hotel).isRequired,
  totalCount: PropTypes.number.isRequired,
  pageChanged: PropTypes.func.isRequired,
  pageSizeChanged: PropTypes.func.isRequired,
  pageSize: PropTypes.number.isRequired,
  deleteHotel: PropTypes.func.isRequired,
};

export default HotelsTable;
