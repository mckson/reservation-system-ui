import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Typography, Box, makeStyles } from '@material-ui/core';
import Service from '../../Models/Service';

const useStyles = makeStyles((theme) => ({
  labelAndValue: {
    display: 'flex',
    alignItems: 'top',
    justifyContent: 'space-between',
    padding: theme.spacing(0, 1, 0, 0),
  },
  wrapper: {},
}));

const ServiceWarningContentComponent = ({ text, service }) => {
  const classes = useStyles();
  return (
    <Grid container spacing={3}>
      <Grid item container alignItems="center" xs={12}>
        <Grid item xs={12}>
          <Typography component="div" className={classes.labelAndValue}>
            <Box>Name</Box>
            <Box fontWeight="fontWeightMedium">{service.name}</Box>
          </Typography>
          <Typography component="div" className={classes.labelAndValue}>
            <Box>Price</Box>
            <Box fontWeight="fontWeightMedium">${service.price}</Box>
          </Typography>
        </Grid>
      </Grid>
      {text ? (
        <Grid item xs={12}>
          <Typography>{text}</Typography>
        </Grid>
      ) : null}
    </Grid>
  );
};

ServiceWarningContentComponent.propTypes = {
  service: PropTypes.instanceOf(Service).isRequired,
  text: PropTypes.string,
};

ServiceWarningContentComponent.defaultProps = {
  text: null,
};

export default ServiceWarningContentComponent;
