import React, { useState } from 'react';
import PropTypes from 'prop-types';
import HotelForm from './HotelForm';

const CreateHotelComponent = ({ open, close, createHotel, onSuccess }) => {
  const [error, setError] = useState(null);

  const onCreateHotel = async (values) => {
    const createdHotel = {
      name: values.name,
      numberFloors: parseInt(values.floors, 10),
      deposit: parseFloat(values.deposit),
      description: values.description,
      mainImage: values.mainImage
        ? {
            image: values.mainImage,
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
    const errorResponse = await createHotel(createdHotel);

    if (errorResponse) {
      setError(errorResponse);
    } else {
      onSuccess('Hotel added successfully');
      close('Hotel added successfully');
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
