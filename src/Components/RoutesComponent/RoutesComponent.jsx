import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';
import PropTypes from 'prop-types';
import User from '../../Models/User';
import Hotel from '../../Models/Hotel';
import Navbar from '../../Common/Navbar';
import HotelsPage from '../HotelsPage';
import HotelFull from '../HotelFull/HotelFull';
import Reservation from '../Reservation';
import SignIn from '../SignIn';
import SignUp from '../SignUp';
import HotelsManagement from '../HotelsManagement/HotelsManagement';

const RoutesComponent = ({
  loggedUser,
  hotels,
  totalPages,
  totalResults,
  pageChanged,
  loguot,
  submit,
  searchHotels,
  isHotelsManagementOpen,
  closeHotelsManagement,
  openHotelsManagement,
}) => {
  return (
    <Router>
      <Navbar
        loggedUser={loggedUser}
        onLogoutClick={loguot}
        openHotelsManagement={openHotelsManagement}
      />

      <HotelsManagement
        isOpen={isHotelsManagementOpen}
        close={closeHotelsManagement}
        hotels={hotels}
      />

      <Switch>
        <Route path="/Hotels/:id">
          <HotelFull />
        </Route>
        <Route path="/Hotels">
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            {hotels ? (
              <HotelsPage
                hotels={hotels}
                totalPages={totalPages}
                totalResults={totalResults}
                onPageChanged={pageChanged}
                searchHotels={searchHotels}
              />
            ) : (
              'Loading'
            )}
          </div>
        </Route>
        <Route path="/Reservation/:hotelId">
          <Reservation />
        </Route>
        <Route path="/SignIn">
          <SignIn onSignIn={submit} />
        </Route>
        <Route path="/SignUp">
          <SignUp onSignUp={submit} />
        </Route>
        <Redirect to="/Hotels" />
      </Switch>
    </Router>
  );
};

RoutesComponent.propTypes = {
  loggedUser: PropTypes.instanceOf(User).isRequired,
  hotels: PropTypes.arrayOf(Hotel).isRequired,
  totalPages: PropTypes.number.isRequired,
  totalResults: PropTypes.number.isRequired,
  pageChanged: PropTypes.func.isRequired,
  loguot: PropTypes.func.isRequired,
  submit: PropTypes.func.isRequired,
  searchHotels: PropTypes.func.isRequired,
  isHotelsManagementOpen: PropTypes.bool.isRequired,
  closeHotelsManagement: PropTypes.func.isRequired,
  openHotelsManagement: PropTypes.func.isRequired,
};

export default RoutesComponent;
