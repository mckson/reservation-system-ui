import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { Typography } from '@material-ui/core';
import HotelFullComponent from './HotelFullComponent';
import Hotel from '../../Models/Hotel';
import API from '../../Common/API';
import Image from '../../Models/HotelImage';

const HotelFull = () => {
  const { id } = useParams();
  const [hotel, setHotel] = useState(null);
  const history = useHistory();

  const onBackClick = () => history.push('/Hotels');

  const onReserveClick = () => history.push(`/Reservation/${hotel.id}`);

  useEffect(() => {
    API.axios
      .get(`/Hotels/${id}`)
      .then((response) => {
        setHotel(new Hotel(response.data));
      })
      .catch((err) => {
        if (err.response) {
          console.log(err.response.data);
          console.log(err.response.status);
          console.log(err.response.headers);
        } else if (err.request) {
          console.log(err.request);
        } else {
          console.log('Error', err.message);
        }
        console.log(err.config);
      });
  }, []);

  return (
    <>
      {hotel ? (
        <HotelFullComponent
          hotel={hotel}
          mainImage={new Image(hotel.mainImage)}
          onBackClick={onBackClick}
          onReserveClick={onReserveClick}
        />
      ) : (
        <Typography variant="h4">Loading</Typography>
      )}
    </>
  );
};

export default HotelFull;
