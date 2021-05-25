import React /* { useState, useEffect } */ from 'react';
import { useParams } from 'react-router-dom';
// import Hotel from '../Models/Hotel';
// import axiosInstance from '../../Common/API';

const HotelFull = () => {
  const { id } = useParams();
  // const [hotel, setHotel] = useState(null);

  return (
    <>
      <p>{id}</p>
      {/* <div>{hotel != null ? hotel.name : 'Loading'}</div> */}
    </>
  );
};

export default HotelFull;
