import './App.css';
import { React, useState, useEffect } from 'react';
import User from './Models/User';
import axiosInstance from './Common/API';
import Routes from './Components/RoutesComponent/Routes';

function App() {
  const [hotels, setHotels] = useState(null);
  const [searchParameters, setSearchParameters] = useState(null);
  const [totalResults, setTotalResults] = useState(null);
  const [pageNumber, setPageNumber] = useState(null);
  const [totalPages, setTotalPages] = useState(null);
  const [user, setUser] = useState(null);

  const onSearchHotels = (searchRequest, page) => {
    setSearchParameters(searchRequest);

    const searchClauses = searchRequest?.split(' ');
    const hotelname = searchClauses?.length > 0 ? searchClauses[0] : '';
    const city = searchClauses?.length > 1 ? searchClauses[1] : '';
    const services = searchClauses?.length > 2 ? searchClauses.slice(2) : [];

    console.log(services);

    console.log(searchRequest);

    axiosInstance
      .get(
        `/Hotels?pageNumber=${
          page || 1
        }&PageSize=2&name=${hotelname}&city=${city}${services
          .map((service) => `&services=${service}`)
          .join('')}`
      )
      .then((response) => {
        setHotels(response.data.content);
        setTotalResults(response.data.totalResults);
        setTotalPages(response.data.totalPages);
        setPageNumber(response.data.pageNumber);
        console.log(response);
        console.log(pageNumber);
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
  };

  useEffect(() => {
    console.log(searchParameters);
    const searchClauses = searchParameters?.split(' ');
    const hotelname = searchClauses?.length > 0 ? searchClauses[0] : '';
    const city = searchClauses?.length > 1 ? searchClauses[1] : '';
    const services = searchClauses?.length > 2 ? searchClauses.slice(2) : [];

    axiosInstance
      .get(
        `/Hotels?pageNumber=1&PageSize=2&name=${hotelname}&city=${city}${services
          .map((service) => `&services=${service}`)
          .join('')}`
      )
      .then((response) => {
        console.log(response);
        setHotels(response.data.content);
        setTotalResults(response.data.totalResults);
        setTotalPages(response.data.totalPages);
        setPageNumber(response.data.pageNumber);
        console.log(response);
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
    onSearchHotels(searchParameters, value);
  };

  return (
    <Routes
      loggedUser={user}
      hotels={hotels}
      totalPages={totalPages}
      totalResults={totalResults}
      pageChanged={onPageChanged}
      loguot={onLogout}
      submit={onSubmit}
      searchHotels={onSearchHotels}
    />
  );
}

export default App;
