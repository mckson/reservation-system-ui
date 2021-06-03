import React from 'react';
import PropTypes from 'prop-types';
import HotelsManagementComponent from './HotelsManagementComponent';
import Hotel from '../../Models/Hotel';

const HotelsManagement = ({ isOpen, close, hotels }) => {
  return (
    <HotelsManagementComponent isOpen={isOpen} close={close} hotels={hotels} />
  );
};

HotelsManagement.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  close: PropTypes.func.isRequired,
  hotels: PropTypes.arrayOf(Hotel).isRequired,
};

export default HotelsManagement;
