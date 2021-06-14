import React from 'react';
import PropTypes from 'prop-types';
import { Checkbox, FormControlLabel, makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  checkbox: {
    padding: theme.spacing(0, 2),
  },
}));

const CompleteOrder = ({ onSubmitOrder }) => {
  const classes = useStyles();
  return (
    <FormControlLabel
      className={classes.checkbox}
      control={<Checkbox onChange={(event, value) => onSubmitOrder(value)} />}
      label="I agree with details of order"
    />
  );
};

CompleteOrder.propTypes = {
  onSubmitOrder: PropTypes.func.isRequired,
};

export default CompleteOrder;
