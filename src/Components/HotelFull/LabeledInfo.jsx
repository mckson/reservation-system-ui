import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core';

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

const LabeledInfo = ({ icon, labelComponent, children }) => {
  const classes = useStyles();
  return (
    <div className={classes.labeledInfo}>
      <div className={classes.label}>
        {icon}
        {labelComponent}
      </div>
      <div className={classes.info}>{children}</div>
    </div>
  );
};

LabeledInfo.propTypes = {
  icon: PropTypes.element.isRequired,
  labelComponent: PropTypes.element.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default LabeledInfo;
