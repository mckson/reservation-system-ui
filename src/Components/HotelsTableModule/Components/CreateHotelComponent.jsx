import React, { useState } from 'react';
import PropTypes from 'prop-types';
import HotelForm from './HotelForm';
import ImageRequests from '../../../api/ImageRequests';
import HotelWarningContentComponent from './HotelWarningContentComponent';

const CreateHotelComponent = ({ open, close, createHotel, onSuccess }) => {
  const [error, setError] = useState(null);
  const [creatingHotel, setCreatingHotel] = useState(null);
  const [mainImage, setMainImage] = useState(null);

  const { createHotelImage } = ImageRequests;

  const createHotelAsync = async () => {
    const [hotel, errorResponse] = await createHotel(creatingHotel);

    if (mainImage && hotel) {
      const image = { ...mainImage };
      image.hotelId = hotel.id;

      await createHotelImage(image);
    }

    if (errorResponse) {
      setError(errorResponse);
    } else {
      onSuccess('Hotel added successfully');
      setCreatingHotel(null);
      close();
    }
  };

  const warningContent = (
    <HotelWarningContentComponent
      text={`Hotel "${creatingHotel?.name}" is going to be created. Accept or decline the creating`}
      hotel={creatingHotel}
      image={mainImage}
    />
  );

  const handleCancel = () => {
    setError('Creating canceled');
  };

  const handleAccept = async () => {
    if (creatingHotel) {
      await createHotelAsync();
    }
  };

  const handleSubmit = (values) => {
    const newHotel = {
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

    const newMainImage = values.newMainImage
      ? {
          image: values.newMainImage.image,
          name: values.newMainImage.name,
          type: values.newMainImage.type,
          isMain: true,
        }
      : null;

    setCreatingHotel(newHotel);
    setMainImage(newMainImage);
  };

  const handleResetError = () => {
    setError(null);
  };

  return (
    <HotelForm
      open={open}
      close={close}
      hotel={creatingHotel}
      submitHandler={handleSubmit}
      title="Hotel creation"
      error={error}
      onCancel={handleCancel}
      onAccept={handleAccept}
      resetError={handleResetError}
      warningTitle="Creating of the hotel"
      warningContent={warningContent}
      color="#52b202"
      acceptText="Create hotel"
      cancelText="Cancel"
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
