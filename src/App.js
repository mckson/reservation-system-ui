import './App.css';
import { React, useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import SignUp from './Models/Components/SignUp';
import SignIn from './Models/Components/SignIn';
import Navbar from './Common/Navbar';
import User from './Models/Models/User';
import axiosInstance from './Common/API';
import HotelsPage from './Models/Components/HotelsPage';
import HotelFull from './Models/Components/HotelFull';

function App() {
  const [hotels, setHotels] = useState(null);
  const [user, setUser] = useState(null);
  // const [isHotelsLoaded, setIsHotelsLoaded] = useState(false);

  useEffect(
    () => {
      axiosInstance
        .get('/Hotels')
        .then((response) => {
          setHotels(response.data);
          // setIsHotelsLoaded(true);
          // console.log(hotels);
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

      axiosInstance({
        method: 'post',
        url: 'Account/RefreshToken',
        data: { token: localStorage.getItem('refresh_token')?.toString() },
      })
        .then((response) => {
          setUser(new User(response.data.user));

          // setIsHotelsLoaded(true);
          // console.log(hotels);
          localStorage.setItem('access_token', response.data.jwtToken);
          localStorage.setItem('refresh_token', response.data.refreshToken);
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
    },
    [
      /* isHotelsLoaded */
    ]
  );

  const onSubmit = (response) => {
    console.log('****');
    console.log(response);
    setUser(new User(response.data.user));

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

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/Main">
            {hotels ? <HotelsPage hotels={hotels} /> : 'Loading'}
          </Route>
          <Route path="/SignIn">
            <SignIn onSignIn={onSubmit} />
          </Route>
          <Route path="/SignUp">
            <SignUp onSignUp={onSubmit} />
          </Route>
          <Route
            path="/Hotels/:id"
            render={(routeProps) => (
              <HotelFull
                hotel={hotels.find(
                  (hotel) => hotel.id === routeProps.match.params.id
                )}
              />
            )}
          />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
