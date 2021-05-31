import './App.css';
import { React, useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';
import SignUp from './Models/Components/SignUp';
import SignIn from './Models/Components/SignIn';
import Navbar from './Common/Navbar';
import User from './Models/Models/User';
import axiosInstance from './Common/API';
import HotelsPage from './Models/Components/HotelsPage';
import HotelFull from './Models/Components/HotelFull';
import Reservation from './Models/Components/Reservation';

function App() {
  const [hotels, setHotels] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    axiosInstance
      .get('/Hotels?pageNumber=2&PageSize=5')
      .then((response) => {
        setHotels(response.data.content);
        console.log(hotels);
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

    localStorage.setItem('access_token', response.data.jwtToken);
    localStorage.setItem('refresh_token', response.data.refreshToken);
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    /* revoke token request */
  };

  return (
    <Router>
      <div>
        <Navbar loggedUser={user} onLogoutClick={handleLogout} />
        <Switch>
          <Route path="/Hotels/:id">
            <HotelFull />
          </Route>
          <Route path="/Hotels">
            {hotels ? <HotelsPage hotels={hotels} /> : 'Loading'}
          </Route>
          <Route path="/Reservation/:hotelId">
            <Reservation />
          </Route>
          <Route path="/SignIn">
            <SignIn onSignIn={onSubmit} />
          </Route>
          <Route path="/SignUp">
            <SignUp onSignUp={onSubmit} />
          </Route>
          <Redirect to="/Hotels" />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
