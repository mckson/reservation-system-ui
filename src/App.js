import './App.css';
import { React, useState, useEffect } from 'react';
import User from './Models/User';
import API from './Common/API';
import Routes from './Components/RoutesComponent/Routes';

function App() {
  const [hotels, setHotels] = useState(null);
  const [searchParameters, setSearchParameters] = useState(null);
  const [totalResults, setTotalResults] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalPages, setTotalPages] = useState(null);
  const [user, setUser] = useState(null);

  const requestHotels = async (searchRequest) => {
    console.log(searchRequest);
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
      setHotels(response.content);
      setTotalResults(response.totalResults);
      setTotalPages(response.totalPages);
      setPageNumber(response.pageNumber);
      setPageSize(response.pageSize);
    }
    console.log(response);
    console.log(pageNumber);
  };

  const onSearchHotels = (searchRequest) => {
    setSearchParameters(searchRequest);
  };

  useEffect(async () => {
    await requestHotels(searchParameters);
  }, [pageSize, pageNumber, searchParameters]);

  const parseJwt = (token) => {
    try {
      return JSON.parse(atob(token.split('.')[1]));
    } catch {
      return null;
    }
  };

  const onSubmit = (response) => {
    console.log('****');
    console.log(response);
    const userDecoded = parseJwt(response.data.jwtToken);

    setUser(new User(userDecoded));

    console.log(userDecoded);

    localStorage.setItem('access_token', response.data.jwtToken);
    localStorage.setItem('refresh_token', response.data.refreshToken);
  };

  const onLogout = () => {
    setUser(null);
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    /* revoke token request */
  };

  const onPageChanged = (event, value) => {
    setPageNumber(value);
  };

  const handlePageSizeChanged = (newSize) => {
    setPageSize(newSize);
  };

  const handleDeleteHotel = async (id) => {
    const deletedHotel = await API.deleteHotel(id);

    if (deletedHotel != null) {
      // const updatedHotels = hotels.filter((hotel) => hotel.id !== id);
      // setHotels(updatedHotels);
      // console.log(deletedHotel);
      await requestHotels(searchParameters);
    }
  };

  const handleUpdateHotel = async (updatedHotel) => {
    const returnedHotel = await API.updateHotel(updatedHotel);

    // eslint-disable-next-line no-debugger
    debugger;
    if (returnedHotel != null) {
      // const updatedHotels = hotels.filter(
      //   (hotel) => hotel.id !== updatedHotel.id
      // );
      await requestHotels(searchParameters);
    }
  };

  const handleCreateHotel = async (createdHotel) => {
    const returnedHotel = await API.createHotel(createdHotel);

    // eslint-disable-next-line no-debugger
    debugger;
    if (returnedHotel != null) {
      await requestHotels(searchParameters);
    }
  };

  const handleCreateRoom = async (createdRoom) => {
    const returnedRoom = await API.createRoom(createdRoom);

    // eslint-disable-next-line no-debugger
    debugger;
    if (returnedRoom != null) {
      await requestHotels(searchParameters); // fix to more effficient way
    }
  };

  const handleUpdateRoom = async (updatedRoom) => {
    try {
      const returnedRoom = await API.updateRoom(updatedRoom);

      if (returnedRoom != null) {
        await requestHotels(searchParameters);
      }

      return null;
    } catch (error) {
      if (error.response.data) {
        return error.response.data.message;
      }
      return error.message;
    }
  };

  const handleDeleteRoom = async (id) => {
    try {
      const returnedRoom = await API.deleteRoom(id);
      if (returnedRoom != null) {
        await requestHotels(searchParameters);
      }

      return null;
    } catch (error) {
      if (error.response.data) {
        return error.response.data.message;
      }
      return error.message;
    }
  };

  // returns error message
  const handleCreateService = async (createdService) => {
    try {
      const returnedService = await API.createService(createdService);

      if (returnedService != null) {
        await requestHotels(searchParameters);
      }

      return null;
    } catch (error) {
      // eslint-disable-next-line no-debugger
      debugger;
      if (error.response.data) {
        // eslint-disable-next-line no-debugger
        debugger;
        return error.response.data.message;
      }
      // eslint-disable-next-line no-debugger
      debugger;
      return error.message;
    }
  };

  const handleUpdateService = async (updatedService) => {
    try {
      const returnedService = await API.updateService(updatedService);

      if (returnedService != null) {
        await requestHotels(searchParameters);
      }

      return null;
    } catch (error) {
      if (error.response.data) {
        return error.response.data.message;
      }
      return error.message;
    }
  };

  const handleDeleteService = async (id) => {
    try {
      const returnedService = await API.deleteService(id);
      if (returnedService != null) {
        await requestHotels(searchParameters);
      }

      // eslint-disable-next-line no-debugger
      debugger;
      return null;
    } catch (error) {
      if (error.response.data) {
        return error.response.data.message;
      }
      return error.message;
    }
  };

  return (
    <Routes
      loggedUser={user}
      hotels={hotels}
      totalPages={totalPages}
      totalResults={totalResults}
      pageSize={pageSize}
      deleteHotel={handleDeleteHotel}
      updateHotel={handleUpdateHotel}
      createHotel={handleCreateHotel}
      createRoom={handleCreateRoom}
      updateRoom={handleUpdateRoom}
      deleteRoom={handleDeleteRoom}
      createService={handleCreateService}
      updateService={handleUpdateService}
      deleteService={handleDeleteService}
      pageChanged={onPageChanged}
      pageSizeChanged={handlePageSizeChanged}
      loguot={onLogout}
      submit={onSubmit}
      searchHotels={onSearchHotels}
    />
  );
}

export default App;
