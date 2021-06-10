import React from 'react';
import PropTypes from 'prop-types';
import Hotel from '../../../Models/Hotel';
import HotelForm from './HotelForm';

const EditHotelComponent = ({ open, close, hotel, updateHotel }) => {
  const onUpdateHotel = (values) => {
    const updatedHotel = {
      id: hotel.id,
      name: values.name,
      numberFloors: parseInt(values.floors, 10),
      deposit: parseFloat(values.deposit),
      description: values.description,
      mainImage: {
        image: values.mainImage,
        hotelId: hotel.id,
      },
      location: {
        country: values.country,
        region: values.region,
        city: values.city,
        street: values.street,
        buildingNumber: parseInt(values.buildingNumber, 10),
      },
    };
    updateHotel(updatedHotel);
    close();
  };

  return (
    <HotelForm
      open={open}
      close={close}
      hotel={hotel}
      submitHandler={onUpdateHotel}
      title={`Edit hotel with id ${hotel.id}`}
    />
  );
};

EditHotelComponent.propTypes = {
  open: PropTypes.bool.isRequired,
  close: PropTypes.func.isRequired,
  hotel: PropTypes.instanceOf(Hotel).isRequired,
  updateHotel: PropTypes.func.isRequired,
};

export default EditHotelComponent;
