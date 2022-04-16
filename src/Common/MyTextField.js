import React from 'react';
import { useField } from 'formik';
import { TextField } from '@material-ui/core';

const MyTextField = (props) => {
  const [field, meta] = useField(props);
  return (
    <TextField
      {...field}
      {...props}
      error={meta.touched && meta.error != null}
      helperText={meta.touched && meta.error ? meta.error : null}
    />
  );
};

export default MyTextField;
