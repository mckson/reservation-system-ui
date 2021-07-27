import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useParams, useHistory } from 'react-router-dom';
import { CircularProgress } from '@material-ui/core';
import HotelFullComponent from './HotelFullComponent';
import Hotel from '../../Models/Hotel';
import User from '../../Models/User';
import Room from '../../Models/Room';
import HotelRequests from '../../api/HotelRequests';
import RoomRequests from '../../api/RoomRequests';
import ServiceRequests from '../../api/ServiceRequests';
import Service from '../../Models/Service';

const { getHotel } = HotelRequests;
const { getRooms } = RoomRequests;
const { getServices } = ServiceRequests;

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

  const [rooms, setRooms] = useState([]);
  const [roomsTotalResults, setRoomsTotalResults] = useState(0);
  const [roomsPageNumber, setRoomsPageNumber] = useState(1);
  const [roomsPageSize, setRoomsPageSize] = useState(10);
  const [roomId, setRoomId] = useState(null);

  const [services, setServices] = useState([]);
  const [servicesTotalResults, setServicesTotalResults] = useState(0);
  const [servicesPageNumber, setServicesPageNumber] = useState(1);
  const [servicesPageSize, setServicesPageSize] = useState(10);
  const [serviceId, setServiceId] = useState(null);

  const [openRoom, setOpenRoom] = useState(false);

  const history = useHistory();

  const handleSelectedRoomChanged = (selectedRoomId) => {
    setRoomId(selectedRoomId);
  };

  const handleSelectedServiceChanged = (selectedServiceId) => {
    setServiceId(selectedServiceId);
  };

  const handleOpenRoomDetailed = () => {
    setOpenRoom(true);
  };

  const handleCloseRoomDetailed = () => {
    setOpenRoom(false);
    setRoomId(null);
  };

  const onBackClick = () => history.push('/Hotels');

  const requestRooms = async (hotelId) => {
    const response = await getRooms({
      pageNumber: roomsPageNumber,
      pageSize: roomsPageSize,
      hotelId: hotelId || hotel?.id,
      dateIn,
      dateOut,
    });

    if (response) {
      const respondedRooms = response.content.map((item) => new Room(item));

      setRooms(respondedRooms);
      setRoomsTotalResults(response.totalResults);
      if (response.pageNumber !== roomsPageNumber) {
        setRoomsPageNumber(response.pageNumber);
      }
      if (response.pageSize !== roomsPageSize) {
        setRoomsPageSize(response.pageSize);
      }
    }
  };

  const requestServices = async (hotelId) => {
    const response = await getServices({
      pageNumber: servicesPageNumber,
      pageSize: servicesPageSize,
      hotelId: hotelId || hotel?.id,
    });

    if (response) {
      const respondedServices = response.content.map(
        (item) => new Service(item)
      );

      setServices(respondedServices);
      setServicesTotalResults(response.totalResults);
      if (response.pageNumber !== servicesPageNumber) {
        setServicesPageNumber(response.pageNumber);
      }
      if (response.pageSize !== servicesPageSize) {
        setServicesPageSize(response.pageSize);
      }
    }
  };

  useEffect(async () => {
    const respondedHotel = await getHotel(id);
    setHotel(new Hotel(respondedHotel));

    await requestRooms(id);
  }, []);

  useEffect(async () => {
    if (hotel) {
      await requestRooms(id);
    }
  }, [roomsPageNumber, roomsPageSize]);

  useEffect(async () => {
    if (hotel) {
      await requestServices(id);
    }
  }, [servicesPageNumber, servicesPageSize]);

  return (
    <>
      {hotel && hotel !== {} ? (
        <HotelFullComponent
          hotel={hotel}
          rooms={rooms}
          services={services}
          roomsTotalResults={roomsTotalResults}
          servicesTotalResults={servicesTotalResults}
          onBackClick={onBackClick}
          loggedUser={loggedUser}
          dateIn={dateIn}
          dateOut={dateOut}
          searchHotels={searchHotels}
          onDateInChange={onDateInChange}
          onDateOutChange={onDateOutChange}
          selectedRoomId={roomId}
          selectedServiceId={serviceId}
          isRoomDetailedOpen={openRoom}
          selectedRoomChanged={handleSelectedRoomChanged}
          selectedServiceChanged={handleSelectedServiceChanged}
          closeRoomDetailed={handleCloseRoomDetailed}
          openRoomDetailed={handleOpenRoomDetailed}
          onRequestRooms={requestRooms}
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
