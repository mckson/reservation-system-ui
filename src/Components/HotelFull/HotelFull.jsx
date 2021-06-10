import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { Typography } from '@material-ui/core';
import HotelFullComponent from './HotelFullComponent';
import Hotel from '../../Models/Hotel';
import API from '../../Common/API';

const HotelFull = () => {
  const { id } = useParams();
  const [hotel, setHotel] = useState(null);
  const history = useHistory();

  // const image = hotel.mainImage;

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
          /*
           * The request was made and the server responded with a
           * status code that falls out of the range of 2xx
           */
          console.log(err.response.data);
          console.log(err.response.status);
          console.log(err.response.headers);
        } else if (err.request) {
          /*
           * The request was made but no response was received, `error.request`
           * is an instance of XMLHttpRequest in the browser and an instance
           * of http.ClientRequest in Node.js
           */
          console.log(err.request);
        } else {
          // Something happened in setting up the request and triggered an Error
          console.log('Error', err.message);
        }
        console.log(err.config);
      });
  }, []);

  return (
    <>
      {hotel != null ? (
        <HotelFullComponent
          hotel={hotel}
          images={hotel.mainImage}
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
