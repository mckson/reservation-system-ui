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
  type,
}) => {
  const classes = useStyles();

  const getTypeColor = () => {
    switch (type) {
      case 'delete':
        return '#f44336';
      case 'update':
        return '#ffc107';
      case 'create':
        return '#52b202';
      default:
        return 'default';
    }
  };

  return (
    <BaseDialog open={open} close={close} title={title} color={getTypeColor()}>
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
          style={
            getTypeColor() !== 'default'
              ? {
                  backgroundColor: getTypeColor(),
                  color: '#FFFFFF',
                }
              : null
          }
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
  type: PropTypes.string,
};

WarningDialog.defaultProps = {
  title: 'Default title',
  cancelText: 'Cancel',
  acceptText: 'Accept',
  type: 'default',
};

export default WarningDialog;
