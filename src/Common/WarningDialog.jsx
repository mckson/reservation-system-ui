import React from 'react';
import PropTypes from 'prop-types';
import { Button, makeStyles } from '@material-ui/core';
import BaseDialog from './BaseDialog';

const useStyles = makeStyles((theme) => ({
  buttons: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: theme.spacing(10, 0, 1, 0),
  },
}));

const WarningDialog = ({
  open,
  close,
  title,
  children,
  onCancel,
  onAccept,
  cancelText,
  acceptText,
  color,
}) => {
  const classes = useStyles();
  return (
    <BaseDialog open={open} close={close} title={title} color={color}>
      {children}
      <div className={classes.empty} />
      <div className={classes.buttons}>
        <Button
          variant="outlined"
          onClick={() => {
            onCancel();
            close();
          }}
        >
          {cancelText}
        </Button>
        <Button
          disableElevation
          variant="contained"
          style={{
            backgroundColor: color,
            color: '#FFFFFF',
          }}
          onClick={() => {
            onAccept();
            close();
          }}
        >
          {acceptText}
        </Button>
      </div>
    </BaseDialog>
  );
};

WarningDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  close: PropTypes.func.isRequired,
  title: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  cancelText: PropTypes.string,
  acceptText: PropTypes.string,
  onCancel: PropTypes.func.isRequired,
  onAccept: PropTypes.func.isRequired,
  color: PropTypes.string,
};

WarningDialog.defaultProps = {
  title: 'Default title',
  cancelText: 'Cancel',
  acceptText: 'Accept',
  color: 'white',
};

export default WarningDialog;
