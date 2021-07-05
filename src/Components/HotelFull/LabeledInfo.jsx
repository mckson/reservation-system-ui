import React from 'react';
import { makeStyles } from '@material-ui/core';
import PropTypes from 'prop-types';

const useStyles = makeStyles((theme) => ({
  labeledInfo: {
    display: 'flex',
    flexDirection: 'column',
    margin: theme.spacing(0, 0, 5, 0),
  },
  label: {
    display: 'flex',
    alignItems: 'center',
  },
  info: {
    margin: theme.spacing(0),
  },
}));

const LabeledInfo = ({ icon, labelComponent, infoComponent }) => {
  const classes = useStyles();
  return (
    <div className={classes.labeledInfo}>
      <div className={classes.label}>
        {icon}
        {labelComponent}
      </div>
      <div className={classes.info}>{infoComponent}</div>
    </div>
  );
};

LabeledInfo.propTypes = {
  icon: PropTypes.element.isRequired,
  labelComponent: PropTypes.element.isRequired,
  infoComponent: PropTypes.element.isRequired,
};

export default LabeledInfo;
