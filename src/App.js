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

  const handlePageSizeChanged = (newSize) => {
    setPageSize(newSize);
  };

  const handleDeleteHotel = async (id) => {
    const deletedHotel = await API.deleteHotel(id);

    if (deletedHotel != null) {
      await requestHotels(searchParameters);
    }
  };

  const handleUpdateHotel = async (updatedHotel) => {
    const returnedHotel = await API.updateHotel(updatedHotel);

    if (returnedHotel != null) {
      await requestHotels(searchParameters);
    }
  };

  const handleCreateHotel = async (createdHotel) => {
    const returnedHotel = await API.createHotel(createdHotel);

    if (returnedHotel != null) {
      await requestHotels(searchParameters);
    }
  };

  const handleCreateRoom = async (createdRoom) => {
    const returnedRoom = await API.createRoom(createdRoom);

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

  const handleUpdateUser = async (updatedUser) => {
    try {
      // eslint-disable-next-line no-debugger
      debugger;
      const returnedUser = await API.updateUser(updatedUser);

      // eslint-disable-next-line no-debugger
      debugger;
      if (returnedUser != null) {
        await requestUsers();
        await requestHotels();
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

  const handleCreateImage = async (image) => {
    try {
      const returnedImage = await API.createImage(image);

      if (returnedImage != null) {
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

  const handleDeleteImage = async (image) => {
    try {
      const returnedImage = await API.deleteImage(image.id);

      if (returnedImage != null) {
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

  return (
    <Routes
      users={users}
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
      updateUser={handleUpdateUser}
      createImage={handleCreateImage}
      deleteImage={handleDeleteImage}
      pageChanged={onPageChanged}
      pageSizeChanged={handlePageSizeChanged}
      loguot={onLogout}
      submit={onSubmit}
      searchHotels={onSearchHotels}
    />
  );
}

export default App;
