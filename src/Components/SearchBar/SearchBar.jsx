import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import SearchBarComponent from './SearchBarComponent';
import SideSearchBarComponent from './SideSearchBarComponent';
import HotelBrief from '../../Models/HotelBrief';
import HotelRequests from '../../api/HotelRequests';

const { getAllBriefHotels } = HotelRequests;

function onlyUnique(value, index, self) {
  return self.indexOf(value) === index;
}

const SearchBar = ({
  side,
  searchHotels,
  dateIn,
  dateOut,
  onDateInChange,
  onDateOutChange,
}) => {
  const [hotelsBrief, setHotelsBrief] = useState([]);
  const [searchClauses, setSearchClauses] = useState([null, null, []]);
  const [selectedDateIn, setDateIn] = useState(dateIn);
  const [selectedDateOut, setDateOut] = useState(dateOut);
  const [newService, setNewService] = useState(null);

  const history = useHistory();

  const cities = hotelsBrief
    .map((hotel) => hotel.location.city)
    .filter(onlyUnique);

  const requestHotelNames = async () => {
    const respondedHotels = await getAllBriefHotels();
    const hotels = respondedHotels.map((hotel) => new HotelBrief(hotel));

    setHotelsBrief(hotels);
  };

  const handleSubmit = () => {
    searchHotels(searchClauses);
    onDateInChange(selectedDateIn);
    onDateOutChange(selectedDateOut);
    history.push('/Hotels');
  };

  const handleChangeName = (value) => {
    const newSearchClauses = { ...searchClauses };
    newSearchClauses[0] = value;
    setSearchClauses(newSearchClauses);
  };

  const handleChangeCity = (value) => {
    const newSearchClauses = { ...searchClauses };
    newSearchClauses[1] = value;
    setSearchClauses(newSearchClauses);
  };

  const handleChangeServices = (value) => {
    const newSearchClauses = { ...searchClauses };
    newSearchClauses[2] = value;
    setSearchClauses(newSearchClauses);
  };

  const handleChangeNewService = (value) => {
    setNewService(value);
  };

  const handleAddNewService = () => {
    const newSearchClauses = { ...searchClauses };
    newSearchClauses[2].push(newService);
    setSearchClauses(newSearchClauses);
    setNewService(null);
  };

  const handleChangeDateIn = (value) => {
    setDateIn(value);
  };

  const handleChangeDateOut = (value) => {
    setDateOut(value);
  };

  useEffect(async () => {
    await requestHotelNames();
  }, []);

  return (
    <>
      {side ? (
        <SideSearchBarComponent
          hotels={hotelsBrief}
          cities={cities}
          searchName={searchClauses[0]}
          searchCity={searchClauses[1]}
          selectedServices={searchClauses[2]}
          creatingService={newService}
          onSubmit={handleSubmit}
          onChangeName={handleChangeName}
          onChangeCity={handleChangeCity}
          onChangeServices={handleChangeServices}
          onChangeNewService={handleChangeNewService}
          onAddNewService={handleAddNewService}
          onChangeDateIn={handleChangeDateIn}
          onChangeDateOut={handleChangeDateOut}
        />
      ) : (
        <SearchBarComponent
          hotels={hotelsBrief}
          cities={cities}
          searchName={searchClauses[0]}
          searchCity={searchClauses[1]}
          selectedServices={searchClauses[2]}
          creatingService={newService}
          onSubmit={handleSubmit}
          onChangeName={handleChangeName}
          onChangeCity={handleChangeCity}
          onChangeServices={handleChangeServices}
          onChangeNewService={handleChangeNewService}
          onAddNewService={handleAddNewService}
          onChangeDateIn={handleChangeDateIn}
          onChangeDateOut={handleChangeDateOut}
        />
      )}
    </>
  );
};

SearchBar.propTypes = {
  side: PropTypes.bool,
  dateIn: PropTypes.string,
  dateOut: PropTypes.string,
  searchHotels: PropTypes.func.isRequired,
  onDateInChange: PropTypes.func.isRequired,
  onDateOutChange: PropTypes.func.isRequired,
};

SearchBar.defaultProps = {
  side: false,
  dateIn: null,
  dateOut: null,
};

export default SearchBar;
