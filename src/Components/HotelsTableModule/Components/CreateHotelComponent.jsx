import React from 'react';
import PropTypes from 'prop-types';
import HotelForm from './HotelForm';

const CreateHotelComponent = ({ open, close, createHotel }) => {
  const onCreateHotel = (values) => {
    const createdHotel = {
      name: values.name,
      numberFloors: parseInt(values.floors, 10),
      deposit: parseFloat(values.deposit),
      description: values.description,
      mainImage: values.mainImage,
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
    createHotel(createdHotel);
    close();
  };

  return (
    <HotelForm
      open={open}
      close={close}
      hotel={null}
      submitHandler={onCreateHotel}
      title="Hotel creation"
    />
  );
};

CreateHotelComponent.propTypes = {
  open: PropTypes.bool.isRequired,
  close: PropTypes.func.isRequired,
  createHotel: PropTypes.func.isRequired,
};

export default CreateHotelComponent;
