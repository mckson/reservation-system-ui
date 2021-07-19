import './App.css';
import { React, useState, useEffect } from 'react';
import { Alert } from '@material-ui/lab';
import { Snackbar } from '@material-ui/core';
import Hotel from './Models/Hotel';
import User from './Models/User';
import API from './Common/API';
import Routes from './Components/RoutesComponent/Routes';
import ManagementService from './Common/ManagementService';
import BaseSearch from './Common/BaseSearch/BaseSearch';
import SearchClause from './Common/BaseSearch/SearchClause';
import SearchOption from './Common/BaseSearch/SearchOption';

function App() {
  const [hotels, setHotels] = useState([]);
  const [searchParameters, setSearchParameters] = useState(null);
  const [totalResults, setTotalResults] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalPages, setTotalPages] = useState(null);
  const [user, setUser] = useState(null);
  const [dateIn, setDateIn] = useState(null);
  const [dateOut, setDateOut] = useState(null);
  const [error, setError] = useState(null);

  const handleResetError = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setError(null);
  };

  const requestHotels = async (searchRequest) => {
    // eslint-disable-next-line no-debugger
    debugger;
    const hotelname = searchRequest?.[0] ? searchRequest[0] : '';
    const city = searchRequest?.[1] ? searchRequest[1] : '';
    const services = searchRequest?.[2] ? searchRequest[2] : [];

    const [response, respondedError] =
      await ManagementService.baseRequestHandler(
        ManagementService.handleGetHotels,
        {
          pageNumber,
          pageSize,
          dateIn,
          dateOut,
          manager: '',
          name: hotelname,
          city,
          services,
        }
      );

    if (response != null) {
      const respondedHotels = response.content.map((item) => new Hotel(item));

      setHotels(respondedHotels);
      setTotalResults(response.totalResults);
      setTotalPages(response.totalPages);
      if (response.pageNumber !== pageNumber) {
        setPageNumber(response.pageNumber);
      }
      if (response.pageSize !== pageSize) {
        setPageSize(response.pageSize);
      }
    } else if (respondedError) {
      setError(respondedError);
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

      setUser(new User(userDecoded));
    }

    await requestHotels(searchParameters);
  }, [pageSize, pageNumber, searchParameters, dateIn, dateOut]);

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

  return (
    <>
      {hotels && hotels.length > 0 ? (
        <BaseSearch
          clauses={[
            new SearchClause(
              'Name',
              '',
              hotels.map((hotel) => hotel.name),
              false
            ),
            new SearchClause(
              'City',
              '',
              hotels.map((hotel) => hotel.location.city),
              false
            ),
            new SearchClause('Services', [], [], true),
            new SearchClause(
              'Country',
              '',
              hotels.map((hotel) => hotel.location.country),
              false
            ),
          ]}
          options={[
            new SearchOption('Parking included', false),
            new SearchOption('Smoking allowed', false),
          ]}
          onSearch={(searchClauses) =>
            onSearchHotels(searchClauses.map((item) => item.value))
          }
        />
      ) : null}
      <Routes
        loggedUser={user}
        hotels={hotels}
        totalPages={totalPages}
        totalResults={totalResults}
        pageChanged={onPageChanged}
        loguot={onLogout}
        submit={onSubmit}
        searchHotels={onSearchHotels}
        dateIn={dateIn}
        dateOut={dateOut}
        onDateInChange={handleDateInChange}
        onDateOutChange={handleDateOutChange}
      />
      <Snackbar
        open={!!error}
        autoHideDuration={5000}
        onClose={handleResetError}
      >
        <Alert onClose={handleResetError} severity="error" variant="filled">
          {error}
        </Alert>
      </Snackbar>
    </>
  );
}

export default App;
