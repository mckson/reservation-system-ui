import React from 'react';
import PropTypes from 'prop-types';
import * as Yup from 'yup';
import PersonalInfoComponent from './PersonalInfoComponent';
import User from '../../../Models/User';

const PersonalInfo = ({ onSetCustomer, loggedUser }) => {
  const initialValues = {
    firstName: loggedUser != null ? loggedUser.firstName : '',
    lastName: loggedUser != null ? loggedUser.lastName : '',
    email: loggedUser != null ? loggedUser.email : '',
    confirmEmail: loggedUser != null ? loggedUser.email : '',
  };

  const validationSchema = Yup.object().shape({
    firstName: Yup.string()
      .max(50, 'Must be 20 characters or shorter')
      .required('Required'),
    lastName: Yup.string()
      .max(50, 'Must be 20 characters or shorter')
      .required('Required'),
    email: Yup.string().email('Invalid email adress').required('Required'),
    confirmEmail: Yup.string()
      .email('Invalid email adress')
      .required('Required')
      .oneOf([Yup.ref('email'), null], 'Emails must be the same'),
  });

  const handleSetCustomer = (values) => {
    const customer = {
      firstName: values.firstName,
      lastName: values.lastName,
      email: values.email,
    };
    onSetCustomer(customer);
  };

  return (
    <PersonalInfoComponent
      onSetCustomer={handleSetCustomer}
      initialValues={initialValues}
      validationSchema={validationSchema}
    />
  );
};

PersonalInfo.propTypes = {
  onSetCustomer: PropTypes.func.isRequired,
  loggedUser: PropTypes.instanceOf(User),
};

PersonalInfo.defaultProps = {
  loggedUser: null,
};

export default PersonalInfo;
