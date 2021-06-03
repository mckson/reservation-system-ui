import {
  Dialog,
  IconButton,
  makeStyles,
  Slide,
  Toolbar,
  Typography,
} from '@material-ui/core';
import React, { forwardRef } from 'react';
import CloseIcon from '@material-ui/icons/Close';
import PropTypes from 'prop-types';
import HotelsTable from '../HotelsTable/HotelsTable';
import Hotel from '../../Models/Hotel';

const useStyles = makeStyles((theme) => ({
  dialogbar: {
    display: 'flex',
    justifyContent: 'space-between',
    background: theme.palette.primary.main,
    color: theme.palette.background.paper,
  },
  content: {
    margin: theme.spacing(3, 7),
  },
}));

const Transition = forwardRef(function Transistion(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const HotelsManagementComponent = ({ isOpen, close, hotels }) => {
  const classes = useStyles();
  return (
    <Dialog
      fullScreen
      fullWidth
      open={isOpen}
      onClose={close}
      TransitionComponent={Transition}
    >
      <Toolbar className={classes.dialogbar}>
        <Typography variant="h6">Hotels management</Typography>
        <IconButton edge="end" color="inherit" onClick={close}>
          <CloseIcon />
        </IconButton>
      </Toolbar>
      <div className={classes.content}>
        <HotelsTable hotels={hotels} />
      </div>
    </Dialog>
  );
};

HotelsManagementComponent.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  close: PropTypes.func.isRequired,
  hotels: PropTypes.arrayOf(Hotel).isRequired,
};

export default HotelsManagementComponent;
