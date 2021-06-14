import React from 'react';
import PropTypes from 'prop-types';
import { Checkbox, FormControlLabel } from '@material-ui/core';

const CompleteOrder = ({ onSubmitOrder }) => {
  return (
    <FormControlLabel
      control={<Checkbox onChange={(event, value) => onSubmitOrder(value)} />}
      label="I agree with details of order"
    />
  );
};

CompleteOrder.propTypes = {
  onSubmitOrder: PropTypes.func.isRequired,
};

export default CompleteOrder;
