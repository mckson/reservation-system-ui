import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Hotel from '../../../Models/Hotel';
import HotelForm from './HotelForm';
import API from '../../../Common/API';

const EditHotelComponent = ({ open, close, hotel, updateHotel, onSuccess }) => {
  const [error, setError] = useState(null);

  const onUpdateHotel = async (values) => {
    const updatedHotel = {
      id: hotel.id,
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

    // eslint-disable-next-line no-debugger
    debugger;
    if (values.newMainImage) {
      const image = {
        image: values.newMainImage.image,
        name: values.newMainImage.name,
        type: values.newMainImage.type,
        hotelId: hotel.id,
        isMain: true,
      };

      await API.createHotelImage(image);
    } else if (values.isDeleteMainImage && hotel?.mainImage) {
      const splited = hotel.mainImage.split('/');
      const imageId = splited[splited.length - 1];

      await API.deleteHotelImage(imageId);
    }

    const [hotelResponse, errorResponse] = await updateHotel(updatedHotel);

    if (errorResponse) {
      setError(errorResponse);
    } else {
      onSuccess(`Hotel ${hotelResponse.name} updated successfully`);
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
  onSuccess: PropTypes.func.isRequired,
};

export default EditHotelComponent;
