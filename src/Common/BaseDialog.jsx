import React from 'react';
import PropTypes from 'prop-types';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  IconButton,
  makeStyles,
} from '@material-ui/core';
import { CloseOutlined } from '@material-ui/icons';

const useStyles = makeStyles(() => ({
  titleSection: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    flexGrow: 1,
  },
  closeButton: {
    width: 'auto',
  },
}));

const BaseDialog = ({ open, close, title, width, children, notFullWidth }) => {
  const classes = useStyles();
  return (
    <Dialog open={open} maxWidth={width} fullWidth={!notFullWidth}>
      <DialogTitle>
        <div className={classes.titleSection}>
          <Typography className={classes.title} variant="h6">
            {title}
          </Typography>
          <IconButton
            size="small"
            className={classes.closeButton}
            onClick={close}
          >
            <CloseOutlined />
          </IconButton>
        </div>
      </DialogTitle>
      <DialogContent>{children}</DialogContent>
    </Dialog>
  );
};

BaseDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  notFullWidth: PropTypes.bool,
  close: PropTypes.func.isRequired,
  title: PropTypes.string,
  width: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

BaseDialog.defaultProps = {
  title: 'Default title',
  width: 'sm',
  notFullWidth: false,
};

export default BaseDialog;
