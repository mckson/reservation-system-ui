import { Container, Typography } from '@material-ui/core';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Formik, Form } from 'formik';
import axiosInstance from '../../Common/API';
import Hotel from '../Models/Hotel';

const Reservation = () => {
  const [hotel, setHotel] = useState(null);
  const { hotelId } = useParams();

  useEffect(() => {
    axiosInstance
      .get(`/Hotels/${hotelId}`)
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
        <Container>
          <div>
            <Typography variant="h5">Reservation</Typography>
            <Typography variant="h6">{hotel.name}</Typography>
            <div className="form">
              <Formik>
                <Form />
              </Formik>
            </div>
          </div>
        </Container>
      ) : (
        'Loading...'
      )}
    </>
  );
};

export default Reservation;
