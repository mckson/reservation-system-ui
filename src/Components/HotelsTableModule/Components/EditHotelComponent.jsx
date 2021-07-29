import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Hotel from '../../../Models/Hotel';
import HotelForm from './HotelForm';
import ImageRequests from '../../../api/ImageRequests';
import HotelWarningContentComponent from './HotelWarningContentComponent';

const EditHotelComponent = ({ open, close, hotel, updateHotel, onSuccess }) => {
  const [error, setError] = useState(null);
  const [updatingHotel, setUpdatingHotel] = useState({ ...hotel });
  const [mainImage, setMainImage] = useState(null);
  const [isDeleteMainImage, setIsDeleteMainImage] = useState(false);

  const { createHotelImage, deleteHotelImage } = ImageRequests;

  const updateHotelAsync = async () => {
    if (mainImage) {
      await createHotelImage(mainImage);
    } else if (isDeleteMainImage && hotel?.mainImage) {
      const splited = hotel.mainImage.split('/');
      const imageId = splited[splited.length - 1];

      await deleteHotelImage(imageId);
    }

    const [hotelResponse, errorResponse] = await updateHotel(updatingHotel);

    if (errorResponse) {
      setError(errorResponse);
    } else {
      onSuccess(`Hotel ${hotelResponse.name} updated successfully`);
      setUpdatingHotel({ ...hotelResponse });
      close('Hotel updated successfully');
    }
  };

  const handleCancel = () => {
    setError('Creating canceled');
  };

  const handleAccept = async () => {
    if (updatingHotel) {
      await updateHotelAsync();
    }
  };

  const handleSubmit = (values) => {
    const newHotel = {
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

    const newMainImage = values.newMainImage
      ? {
          image: values.newMainImage.image,
          name: values.newMainImage.name,
          type: values.newMainImage.type,
          hotelId: hotel.id,
          isMain: true,
        }
      : null;

    const isDeleteImage = values.isDeleteMainImage;

    setUpdatingHotel(newHotel);
    setMainImage(newMainImage);
    setIsDeleteMainImage(isDeleteImage);
  };

  const handleResetError = () => {
    setError(null);
  };

  const warningContent = (
    <HotelWarningContentComponent
      text={`Hotel "${updatingHotel?.name}" is going to be updated. Accept or decline the updating`}
      hotel={updatingHotel}
      image={
        mainImage ||
        (isDeleteMainImage || !hotel.mainImage
          ? null
          : { image: hotel.mainImage })
      }
    />
  );

  return (
    <HotelForm
      open={open}
      close={close}
      hotel={updatingHotel}
      submitHandler={handleSubmit}
      title={`Edit hotel with id ${hotel.id}`}
      error={error}
      resetError={handleResetError}
      onAccept={handleAccept}
      onCancel={handleCancel}
      acceptText="Update hotel"
      cancelText="Cancel"
      warningContent={warningContent}
      warningTitle="Updating of the hotel"
      color="#ffc107"
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
