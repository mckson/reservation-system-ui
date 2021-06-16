import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { CircularProgress } from '@material-ui/core';
import PropTypes from 'prop-types';
import HotelFullComponent from './HotelFullComponent';
import Hotel from '../../Models/Hotel';
import API from '../../Common/API';
import User from '../../Models/User';

// import Default from '../../images/default.png';

const HotelFull = ({
  loggedUser,
  dateIn,
  dateOut,
  searchHotels,
  onDateInChange,
  onDateOutChange,
}) => {
  const { id } = useParams();
  const [hotel, setHotel] = useState(null);
  const history = useHistory();

  const onBackClick = () => history.push('/Hotels');

  useEffect(() => {
    API.axios
      .get(`/Hotels/${id}`)
      .then((response) => {
        // if (response.data.mainImage == null) {
        //   response.data.mainImage = { id: 0, image: Default };
        // }
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
      {hotel && hotel !== {} ? (
        <HotelFullComponent
          hotel={hotel}
          onBackClick={onBackClick}
          loggedUser={loggedUser}
          dateIn={dateIn}
          dateOut={dateOut}
          searchHotels={searchHotels}
          onDateInChange={onDateInChange}
          onDateOutChange={onDateOutChange}
        />
      ) : (
        <div
          style={{
            flexGrow: 1,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <CircularProgress />
        </div>
      )}
    </>
  );
};

HotelFull.propTypes = {
  loggedUser: PropTypes.instanceOf(User),
  dateIn: PropTypes.string,
  dateOut: PropTypes.string,
  searchHotels: PropTypes.func.isRequired,
  onDateInChange: PropTypes.func.isRequired,
  onDateOutChange: PropTypes.func.isRequired,
};

HotelFull.defaultProps = {
  loggedUser: null,
  dateIn: null,
  dateOut: null,
};

export default HotelFull;
