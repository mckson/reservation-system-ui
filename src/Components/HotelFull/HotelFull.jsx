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

const { getHotel } = HotelRequests;
const { getRooms } = RoomRequests;

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
  const [roomsTotalResults, setRoomsTotalResults] = useState(null);
  const [roomsPageNumber, setRoomsPageNumber] = useState(1);
  const [roomsPageSize, setRoomsPageSize] = useState(null);
  const [roomsTotalPages, setRoomsTotalPages] = useState(null);
  const [roomId, setRoomId] = useState(null);
  const [openRoom, setOpenRoom] = useState(false);

  const history = useHistory();

  const handleSelectedRoomChanged = (selectedRoomId) => {
    setRoomId(selectedRoomId);
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
    const response = getRooms({
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
      setRoomsTotalPages(response.totalPages);
      if (response.pageNumber !== roomsPageNumber) {
        setRoomsPageNumber(response.pageNumber);
      }
      if (response.pageSize !== roomsPageSize) {
        setRoomsPageSize(response.pageSize);
      }
    }
  };

  useEffect(async () => {
    const respondedHotel = await getHotel(id);
    setHotel(new Hotel(respondedHotel));

    await requestRooms(id);
  }, []);

  return (
    <>
      {hotel && hotel !== {} ? (
        <HotelFullComponent
          hotel={hotel}
          rooms={rooms}
          roomsTotalResults={roomsTotalResults}
          roomsTotalPages={roomsTotalPages}
          onBackClick={onBackClick}
          loggedUser={loggedUser}
          dateIn={dateIn}
          dateOut={dateOut}
          searchHotels={searchHotels}
          onDateInChange={onDateInChange}
          onDateOutChange={onDateOutChange}
          selectedRoomId={roomId}
          isRoomDetailedOpen={openRoom}
          selectedRoomChanged={handleSelectedRoomChanged}
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
