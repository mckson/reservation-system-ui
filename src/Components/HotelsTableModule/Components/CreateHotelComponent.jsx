import React, { useState } from 'react';
import PropTypes from 'prop-types';
import HotelForm from './HotelForm';
import ImageRequests from '../../../api/ImageRequests';

const CreateHotelComponent = ({ open, close, createHotel, onSuccess }) => {
  const [error, setError] = useState(null);

  const { createHotelImage } = ImageRequests;

  const onCreateHotel = async (values) => {
    const createdHotel = {
      name: values.name,
      numberFloors: parseInt(values.floors, 10),
      deposit: parseFloat(values.deposit),
      description: values.description,
      location: {
        country: values.country,
        region: values.region,
        city: values.city,
        street: values.street,
        buildingNumber: parseInt(values.buildingNumber, 10),
      },
    };

    const [hotel, errorResponse] = await createHotel(createdHotel);

    if (values.newMainImage && hotel) {
      const image = {
        image: values.newMainImage.image,
        name: values.newMainImage.name,
        type: values.newMainImage.type,
        hotelId: hotel.id,
        isMain: true,
      };

      await createHotelImage(image);
    }

    if (errorResponse) {
      setError(errorResponse);
    } else {
      onSuccess('Hotel added successfully');
      close();
    }
  };

  const handleResetError = () => {
    setError(null);
  };

  return (
    <HotelForm
      open={open}
      close={close}
      hotel={null}
      submitHandler={onCreateHotel}
      title="Hotel creation"
      error={error}
      resetError={handleResetError}
    />
  );
};

CreateHotelComponent.propTypes = {
  open: PropTypes.bool.isRequired,
  close: PropTypes.func.isRequired,
  createHotel: PropTypes.func.isRequired,
  onSuccess: PropTypes.func.isRequired,
};

export default CreateHotelComponent;
