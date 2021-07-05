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

const BaseDialog = ({ open, close, title, contentComponent, width }) => {
  const classes = useStyles();
  return (
    <Dialog open={open} maxWidth={width} fullWidth>
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
      <DialogContent>{contentComponent}</DialogContent>
    </Dialog>
  );
};

BaseDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  close: PropTypes.func.isRequired,
  title: PropTypes.string,
  contentComponent: PropTypes.elementType.isRequired,
  width: PropTypes.string,
};

BaseDialog.defaultProps = {
  title: 'Default title',
  width: 'sm',
};

export default BaseDialog;
