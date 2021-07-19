/* eslint-disable no-nested-ternary */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import * as Yup from 'yup';
import PersonalInfoComponent from './PersonalInfoComponent';
import User from '../../../Models/User';

const PersonalInfo = ({ onSetCustomer, loggedUser }) => {
  const [customer, setCustomer] = useState(null);

  const initialValues = {
    firstName: customer
      ? customer.firstName
      : loggedUser
      ? loggedUser.firstName
      : '',
    lastName: customer
      ? customer.lastName
      : loggedUser != null
      ? loggedUser.lastName
      : '',
    email: customer
      ? customer.email
      : loggedUser != null
      ? loggedUser.email
      : '',
    confirmEmail: customer
      ? customer.email
      : loggedUser != null
      ? loggedUser.email
      : '',

    passportNumber: '',
    phoneNumber: '',
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
    passportNumber: Yup.string()
      .max(50, 'Must be 20 characters or shorter')
      .required('Required'),
    phoneNumber: Yup.string()
      .max(50, 'Must be 20 characters or shorter')
      .matches(
        /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/im,
        'Invalid phone number'
      )
      .required('Required'),
  });

  const handleSetCustomer = (values) => {
    const customerToSet = {
      firstName: values.firstName,
      lastName: values.lastName,
      email: values.email,
      passportNumber: values.passportNumber,
      phoneNumber: values.phoneNumber,
    };
    setCustomer(customerToSet);
    onSetCustomer(customerToSet);
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
