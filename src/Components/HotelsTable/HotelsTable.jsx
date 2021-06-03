import React from 'react';
import PropTypes from 'prop-types';
import HotelsTableComponent from './HotelsTableComponent';
import Hotel from '../../Models/Hotel';

const HotelsTable = ({ hotels }) => {
  return <HotelsTableComponent hotels={hotels} />;
};

HotelsTable.propTypes = {
  hotels: PropTypes.arrayOf(Hotel).isRequired,
};

export default HotelsTable;
