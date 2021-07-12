import React from 'react';
import * as Yup from 'yup';
import BaseDialog from '../../Common/BaseDialog';
// import PropTypes from 'prop-types'

const validationSchema = Yup.object({
  userName: Yup.string()
    .max(20, 'Must be 20 characters or less')
    .required('Required'),

  email: Yup.string().email('Invalid email adress').required('Required'),

  firstName: Yup.string()
    .max(20, 'Must be 20 characters or less')
    .required('Required'),

  lastName: Yup.string()
    .max(20, 'Must be 20 characters or less')
    .required('Required'),

  phoneNumber: Yup.string()
    .matches(
      /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/im,
      'Invalid phone number'
    )
    .required('Required'),

  password: Yup.string()
    .min(8, 'Must be 8 characters or more')
    .required('Required'),

  passwordConfirm: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Required'),

  dateOfBirth: Yup.date().required('Required'),
});

const CreateUserComponent = () => {
  return <BaseDialog title="User creation" />;
};

// CreateUserComponent.propTypes = {

// }

export default CreateUserComponent;
