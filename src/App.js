import './App.css';
import { React, useState, useEffect } from 'react';
import Hotel from './Models/Hotel';
import User from './Models/User';
import API from './Common/API';
import Routes from './Components/RoutesComponent/Routes';

function App() {
  const [users, setUsers] = useState([]);
  const [hotels, setHotels] = useState([]);
  const [searchParameters, setSearchParameters] = useState(null);
  const [totalResults, setTotalResults] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalPages, setTotalPages] = useState(null);
  const [user, setUser] = useState(null);
  const [dateIn, setDateIn] = useState(null);
  const [dateOut, setDateOut] = useState(null);

  const requestUsers = async () => {
    const response = await API.getUsers();
    console.log(response);

    if (response) {
      const respondedUsers = response.map((item) => new User(item));
      setUsers(respondedUsers);
    }
  };

  const requestHotels = async (searchRequest) => {
    const searchClauses = searchRequest?.split(' ');
    const hotelname = searchClauses?.length > 0 ? searchClauses[0] : '';
    const city = searchClauses?.length > 1 ? searchClauses[1] : '';
    const services = searchClauses?.length > 2 ? searchClauses.slice(2) : [];

    const response = await API.getHotels(
      pageNumber,
      pageSize,
      hotelname,
      city,
      services
    );

    if (response != null) {
      const respondedHotels = response.content.map((item) => new Hotel(item));

      setHotels(respondedHotels);
      setTotalResults(response.totalResults);
      setTotalPages(response.totalPages);
      setPageNumber(response.pageNumber);
      setPageSize(response.pageSize);
    }
  };

  const onSearchHotels = (searchRequest) => {
    setSearchParameters(searchRequest);
  };

  const parseJwt = (token) => {
    try {
      return JSON.parse(atob(token.split('.')[1]));
    } catch {
      return null;
    }
  };

  useEffect(async () => {
    const jwt = localStorage.getItem('access_token');
    if (jwt && user == null) {
      const userDecoded = parseJwt(jwt);
      // eslint-disable-next-line no-debugger
      debugger;
      setUser(new User(userDecoded));
    }

    await requestHotels(searchParameters);
  }, [pageSize, pageNumber, searchParameters]);

  useEffect(async () => {
    if (user) {
      await requestUsers();
    }
  }, [user]);

  const onSubmit = (response) => {
    const userDecoded = parseJwt(response.data.jwtToken);
    setUser(new User(userDecoded));

    localStorage.setItem('access_token', response.data.jwtToken);
    localStorage.setItem('refresh_token', response.data.refreshToken);
  };

  const onLogout = async () => {
    setUser(null);

    await API.axios.post('/Account/SignOut', {
      token: localStorage.getItem('refresh_token'),
    });

    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
  };

  const onPageChanged = (event, value) => {
    setPageNumber(value);
  };

  const handleDateInChange = (value) => {
    setDateIn(value);
  };

  const handleDateOutChange = (value) => {
    setDateOut(value);
  };

  // const handlePageSizeChanged = (newSize) => {
  //   setPageSize(newSize);
  // };

  return (
    <Routes
      users={users}
      loggedUser={user}
      hotels={hotels}
      totalPages={totalPages}
      totalResults={totalResults}
      // pageSize={pageSize}
      // deleteHotel={handleDeleteHotel}
      // updateHotel={handleUpdateHotel}
      // createHotel={handleCreateHotel}
      // createRoom={handleCreateRoom}
      // updateRoom={handleUpdateRoom}
      // deleteRoom={handleDeleteRoom}
      // createService={handleCreateService}
      // updateService={handleUpdateService}
      // deleteService={handleDeleteService}
      // updateUser={handleUpdateUser}
      // createImage={handleCreateImage}
      // deleteImage={handleDeleteImage}
      pageChanged={onPageChanged}
      // pageSizeChanged={handlePageSizeChanged}
      loguot={onLogout}
      submit={onSubmit}
      searchHotels={onSearchHotels}
      dateIn={dateIn}
      dateOut={dateOut}
      onDateInChange={handleDateInChange}
      onDateOutChange={handleDateOutChange}
    />
  );
}

export default App;
