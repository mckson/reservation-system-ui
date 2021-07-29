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

const useStyles = makeStyles((theme) => ({
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
  content: {
    padding: theme.spacing(1, 0, 0, 0),
  },
}));

const BaseDialog = ({
  open,
  close,
  title,
  width,
  children,
  notFullWidth,
  color,
}) => {
  const classes = useStyles(color);
  return (
    <Dialog open={open} maxWidth={width} fullWidth={!notFullWidth}>
      <DialogTitle style={{ borderBottom: `1px solid ${color}` }}>
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
      <DialogContent>
        <div className={classes.content}>{children}</div>
      </DialogContent>
    </Dialog>
  );
};

BaseDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  close: PropTypes.func.isRequired,
  title: PropTypes.string,
  notFullWidth: PropTypes.bool,
  width: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  color: PropTypes.string,
};

BaseDialog.defaultProps = {
  title: 'Default title',
  width: 'sm',
  notFullWidth: false,
  color: 'white',
};

export default BaseDialog;
