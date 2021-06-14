import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Hotel from '../../../Models/Hotel';
import HotelForm from './HotelForm';

const EditHotelComponent = ({ open, close, hotel, updateHotel }) => {
  const [error, setError] = useState(null);

  const onUpdateHotel = async (values) => {
    const updatedHotel = {
      id: hotel.id,
      name: values.name,
      numberFloors: parseInt(values.floors, 10),
      deposit: parseFloat(values.deposit),
      description: values.description,
      mainImage: values.mainImage
        ? {
            image: values.mainImage,
            hotelId: hotel.id,
          }
        : null,
      location: {
        country: values.country,
        region: values.region,
        city: values.city,
        street: values.street,
        buildingNumber: parseInt(values.buildingNumber, 10),
      },
    };
    // eslint-disable-next-line no-debugger
    debugger;
    const errorResponse = await updateHotel(updatedHotel);

    if (errorResponse) {
      setError(errorResponse);
    } else {
      close('Hotel updated successfully');
    }
  };

  const handleResetError = () => {
    setError(null);
  };

  return (
    <HotelForm
      open={open}
      close={close}
      hotel={hotel}
      submitHandler={onUpdateHotel}
      title={`Edit hotel with id ${hotel.id}`}
      error={error}
      resetError={handleResetError}
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
