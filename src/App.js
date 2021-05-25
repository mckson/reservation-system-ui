import './App.css';
import { React, useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import SignUp from './Models/Components/SignUp';
import SignIn from './Models/Components/SignIn';
import Navbar from './Common/Navbar';
import User from './Models/Models/User';
import axiosInstance from './Common/API';
import HotelsPage from './Models/Components/HotelsPage';

const GetHotels = () => axiosInstance.get('/Hotels');

function App() {
  const [loggedUser, setLoggedUser] = useState(
    JSON.parse(localStorage.getItem('current_user')) != null
      ? new User(JSON.parse(localStorage.getItem('current_user')))
      : null
  );

  const [hotels, setHotels] = useState([]);

  useEffect(async () => {
    console.log('*');
    GetHotels()
      .then((response) => {
        console.log(response.data);
        setHotels(response.data);
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
    console.log('**');
  }, []);

  const onSubmit = (response) => {
    const user = new User(response.data.user);
    setLoggedUser(user);

    localStorage.setItem('current_user', JSON.stringify(response.data.user));
    localStorage.setItem('access_token', response.data.jwtToken);
    localStorage.setItem('refresh_token', response.data.refreshToken);
  };

  const handleLogout = () => {
    setLoggedUser(null);
    localStorage.removeItem('access_token');
    localStorage.removeItem('current_user');
    /* revoke token request */
  };

  return (
    <Router>
      <div>
        <Navbar loggedUser={loggedUser} onLogoutClick={handleLogout} />

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
        </Switch>
      </div>
    </Router>
  );
}

export default App;
