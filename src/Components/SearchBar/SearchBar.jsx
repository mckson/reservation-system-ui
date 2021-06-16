import React from 'react';
import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { useHistory } from 'react-router-dom';
import SearchBarComponent from './SearchBarComponent';
import SideSearchBarComponent from './SideSearchBarComponent';

const now = new Date();
const year = now.getFullYear();
const month =
  now.getMonth() + 1 > 9 ? now.getMonth() + 1 : `0${now.getMonth() + 1}`;
const day = now.getDate();
const today = `${year}-${month}-${day}`;

const validationSchema = Yup.object({
  search: Yup.string(),
  dateIn: Yup.date().min(today, 'Cannot be earlier than today'),
  dateOut: Yup.date().when(
    'dateIn',
    (dateIn, schema) =>
      dateIn && schema.min(dateIn, 'Cannot be earlier than date-in')
  ),
});

const SearchBar = ({
  side,
  searchHotels,
  dateIn,
  dateOut,
  onDateInChange,
  onDateOutChange,
}) => {
  const placeholder = 'Search... (name city service)';
  const history = useHistory();

  const initialValues = {
    search: '',
    dateIn: dateIn || '',
    dateOut: dateOut || '',
  };

  const handleSubmit = (values) => {
    // eslint-disable-next-line no-debugger
    debugger;
    searchHotels(values.search);
    onDateInChange(values.dateIn);
    onDateOutChange(values.dateOut);
    history.push('/Hotels');
  };

  return (
    <>
      {side ? (
        <SideSearchBarComponent
          initialValues={initialValues}
          placeholder={placeholder}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        />
      ) : (
        <SearchBarComponent
          initialValues={initialValues}
          placeholder={placeholder}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
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
