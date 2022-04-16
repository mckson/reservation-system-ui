import React from 'react';
import PropTypes from 'prop-types';
import { Box, Grid, Typography, makeStyles } from '@material-ui/core';
import RoomView from '../../Models/RoomView';

const useStyles = makeStyles((theme) => ({
  labelAndValue: {
    display: 'flex',
    alignItems: 'top',
    justifyContent: 'space-between',
    padding: theme.spacing(0, 1, 0, 0),
  },
  wrapper: {},
}));

const RoomViewWarningContentComponent = ({ text, roomView }) => {
  const classes = useStyles();
  return (
    <Grid container spacing={3}>
      <Grid item container alignItems="center" xs={12}>
        <Grid item xs={12}>
          <Typography component="div" className={classes.labelAndValue}>
            <Box>Name</Box>
            <Box fontWeight="fontWeightMedium">{roomView.name}</Box>
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

RoomViewWarningContentComponent.propTypes = {
  roomView: PropTypes.instanceOf(RoomView).isRequired,
  text: PropTypes.string,
};

RoomViewWarningContentComponent.defaultProps = {
  text: null,
};

export default RoomViewWarningContentComponent;
