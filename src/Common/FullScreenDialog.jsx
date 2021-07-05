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

const FullScreenDialog = ({ isOpen, close, title, contentComponent }) => {
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
        <Typography variant="h6">{title}</Typography>
        <IconButton edge="end" color="inherit" onClick={close}>
          <CloseIcon />
        </IconButton>
      </Toolbar>
      {contentComponent}
    </Dialog>
  );
};

FullScreenDialog.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  close: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  contentComponent: PropTypes.elementType.isRequired,
};

export default FullScreenDialog;
