import { IconButton, TableRow, TableCell, makeStyles } from '@material-ui/core';
import { DeleteOutlined } from '@material-ui/icons';
import React from 'react';
import PropTypes from 'prop-types';
import User from '../../../Models/User';
import ManagerRowMap from '../ManagerRowMap/ManagerRowMap';

const useStyles = makeStyles((theme) => ({
  button: {
    margin: 0,
    color: theme.palette.primary.main,
  },
  actions: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
}));

const ManagerRowComponent = ({ manager, updateUser }) => {
  const classes = useStyles();

  const onDeleteManager = async () => {
    // eslint-disable-next-line no-param-reassign
    manager.hotelId = null;
    const errorResponse = await updateUser(manager);
    console.log(errorResponse);
  };
  return (
    <>
      <TableRow>
        <ManagerRowMap manager={manager} />
        <TableCell className={classes.actions}>
          <IconButton
            className={classes.button}
            onClick={async () => onDeleteManager()}
          >
            <DeleteOutlined />
          </IconButton>
        </TableCell>
      </TableRow>
    </>
  );
};

ManagerRowComponent.propTypes = {
  manager: PropTypes.instanceOf(User).isRequired,
  updateUser: PropTypes.func.isRequired,
};

export default ManagerRowComponent;
