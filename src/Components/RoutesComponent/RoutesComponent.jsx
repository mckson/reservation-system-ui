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
// import Reservation from '../Reservation';
import SignIn from '../SignIn';
import SignUp from '../SignUp';
import HotelsManagement from '../HotelsManagement/HotelsManagement';
import Constants from '../../Common/Constants';

const RoutesComponent = ({
  users,
  loggedUser,
  hotels,
  totalPages,
  totalResults,
  pageChanged,
  // pageSizeChanged,
  loguot,
  submit,
  // deleteHotel,
  // updateHotel,
  // createHotel,
  // createRoom,
  // updateRoom,
  // deleteRoom,
  // createService,
  // updateService,
  // deleteService,
  // updateUser,
  // createImage,
  // deleteImage,
  searchHotels,
  // pageSize,
  isHotelsManagementOpen,
  closeHotelsManagement,
  openHotelsManagement,

  dateIn,
  dateOut,
  onDateInChange,
  onDateOutChange,
}) => {
  return (
    <Router>
      <Navbar
        loggedUser={loggedUser}
        onLogoutClick={loguot}
        openHotelsManagement={openHotelsManagement}
      />
      {loggedUser &&
      (loggedUser?.roles.includes(Constants.adminRole) ||
        loggedUser?.roles.includes(Constants.managerRole)) ? (
        <HotelsManagement
          users={users}
          isOpen={isHotelsManagementOpen}
          close={closeHotelsManagement}
          // totalCount={totalResults}
          // hotels={hotels}
          // pageChanged={pageChanged}
          // pageSize={pageSize}
          // pageSizeChanged={pageSizeChanged}
          // deleteHotel={deleteHotel}
          // updateHotel={updateHotel}
          // createHotel={createHotel}
          // createRoom={createRoom}
          // updateRoom={updateRoom}
          // deleteRoom={deleteRoom}
          // createService={createService}
          // updateService={updateService}
          // deleteService={deleteService}
          // updateUser={updateUser}
          // createImage={createImage}
          // deleteImage={deleteImage}
        />
      ) : null}
      <Switch>
        <Route path="/Hotels/:id">
          <HotelFull
            loggedUser={loggedUser}
            dateIn={dateIn}
            dateOut={dateOut}
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
              'Loading'
            )}
          </div>
        </Route>
        {/* <Route path="/Reservation/:hotelId">
          <Reservation />
        </Route> */}
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
  // pageSize: PropTypes.number.isRequired,
  pageChanged: PropTypes.func.isRequired,
  // pageSizeChanged: PropTypes.func.isRequired,
  loguot: PropTypes.func.isRequired,
  submit: PropTypes.func.isRequired,
  searchHotels: PropTypes.func.isRequired,
  isHotelsManagementOpen: PropTypes.bool.isRequired,
  closeHotelsManagement: PropTypes.func.isRequired,
  openHotelsManagement: PropTypes.func.isRequired,
  // deleteHotel: PropTypes.func.isRequired,
  // updateHotel: PropTypes.func.isRequired,
  // createHotel: PropTypes.func.isRequired,
  // createRoom: PropTypes.func.isRequired,
  // updateRoom: PropTypes.func.isRequired,
  // deleteRoom: PropTypes.func.isRequired,
  // createService: PropTypes.func.isRequired,
  // updateService: PropTypes.func.isRequired,
  // deleteService: PropTypes.func.isRequired,
  // updateUser: PropTypes.func.isRequired,
  // createImage: PropTypes.func.isRequired,
  // deleteImage: PropTypes.func.isRequired,
  dateIn: PropTypes.string,
  dateOut: PropTypes.string,
  onDateInChange: PropTypes.func.isRequired,
  onDateOutChange: PropTypes.func.isRequired,
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
