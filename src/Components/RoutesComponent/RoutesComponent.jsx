import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';
import PropTypes from 'prop-types';
import { CircularProgress } from '@material-ui/core';
import User from '../../Models/User';
import Hotel from '../../Models/Hotel';
import Navbar from '../../Common/Navbar';
import HotelsPage from '../HotelsPage';
import HotelFull from '../HotelFull/HotelFull';
// import Reservation from '../Reservation';
import SignIn from '../SignIn';
import SignUp from '../SignUp';
// eslint-disable-next-line import/no-named-as-default
import HotelsManagement from '../HotelsManagement/HotelsManagement';
import OrdersSection from '../OrdersSection/OrdersSection';
import Constants from '../../Common/Constants';

const RoutesComponent = ({
  users,
  loggedUser,
  hotels,
  totalPages,
  totalResults,
  pageChanged,
  loguot,
  submit,
  searchHotels,
  // pageSize,
  isHotelsManagementOpen,
  closeHotelsManagement,
  openHotelsManagement,
  // refreshUsers,
  // refreshHotels,
  dateIn,
  dateOut,
  onDateInChange,
  onDateOutChange,
  isReservationsOpen,
  openReservations,
  closeReservations,
}) => {
  return (
    <Router>
      <Navbar
        loggedUser={loggedUser}
        onLogoutClick={loguot}
        openHotelsManagement={openHotelsManagement}
        openReservations={openReservations}
      />
      {loggedUser &&
      (loggedUser?.roles.includes(Constants.adminRole) ||
        loggedUser?.roles.includes(Constants.managerRole)) ? (
        <HotelsManagement
          users={users}
          isOpen={isHotelsManagementOpen}
          close={closeHotelsManagement}
          loggedUser={loggedUser}
        />
      ) : null}
      {loggedUser ? (
        <OrdersSection
          isOpen={isReservationsOpen}
          close={closeReservations}
          user={loggedUser}
        />
      ) : null}
      <Switch>
        <Route path="/Hotels/:id">
          <HotelFull
            loggedUser={loggedUser}
            dateIn={dateIn}
            dateOut={dateOut}
            searchHotels={searchHotels}
            onDateInChange={onDateInChange}
            onDateOutChange={onDateOutChange}
          />
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
                dateIn={dateIn}
                dateOut={dateOut}
                onDateInChange={onDateInChange}
                onDateOutChange={onDateOutChange}
              />
            ) : (
              <CircularProgress />
            )}
          </div>
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
  users: PropTypes.arrayOf(User),
  loggedUser: PropTypes.instanceOf(User),
  hotels: PropTypes.arrayOf(Hotel),
  totalPages: PropTypes.number,
  totalResults: PropTypes.number,
  pageChanged: PropTypes.func.isRequired,
  loguot: PropTypes.func.isRequired,
  submit: PropTypes.func.isRequired,
  searchHotels: PropTypes.func.isRequired,
  isHotelsManagementOpen: PropTypes.bool.isRequired,
  closeHotelsManagement: PropTypes.func.isRequired,
  openHotelsManagement: PropTypes.func.isRequired,
  dateIn: PropTypes.string,
  dateOut: PropTypes.string,
  onDateInChange: PropTypes.func.isRequired,
  onDateOutChange: PropTypes.func.isRequired,
  //   refreshUsers: PropTypes.func.isRequired,
  //   refreshHotels: PropTypes.func.isRequired,
  isReservationsOpen: PropTypes.bool.isRequired,
  openReservations: PropTypes.func.isRequired,
  closeReservations: PropTypes.func.isRequired,
};

RoutesComponent.defaultProps = {
  users: [],
  loggedUser: null,
  hotels: null,
  totalPages: 0,
  totalResults: 0,
  dateIn: null,
  dateOut: null,
};

export default RoutesComponent;
