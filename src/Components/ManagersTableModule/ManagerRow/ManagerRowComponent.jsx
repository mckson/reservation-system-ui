import { IconButton, TableRow, TableCell, makeStyles } from '@material-ui/core';
import { DeleteOutlined } from '@material-ui/icons';
import React from 'react';
import PropTypes from 'prop-types';
import User from '../../../Models/User';
import ManagerRowMap from '../ManagerRowMap/ManagerRowMap';
import Hotel from '../../../Models/Hotel';

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

const ManagerRowComponent = ({
  manager,
  updateUser,
  onSuccess,
  onError,
  hotel,
}) => {
  const classes = useStyles();

  const onDeleteManager = async () => {
    // eslint-disable-next-line no-debugger
    debugger;
    // eslint-disable-next-line no-param-reassign
    if (manager.hotels.length > 1) {
      const index = manager.hotels.findIndex(hotel.id);

      if (index === -1) {
        return 'Current hotel does not contain that manager';
      }

      manager.hotels.splice(index, 1);
    } else {
      if (manager.hotels[0] !== hotel.id) {
        return 'Current hotel does not contain that manager';
      }

      // eslint-disable-next-line no-param-reassign
      manager.hotels = [];
    }

    const errorResponse = await updateUser(manager);
    console.log(errorResponse);

    return errorResponse;
  };
  return (
    <>
      <TableRow>
        <ManagerRowMap manager={manager} />
        <TableCell className={classes.actions}>
          <IconButton
            className={classes.button}
            onClick={async () => {
              const errorResponse = await onDeleteManager();

              if (errorResponse) {
                onError(errorResponse);
              } else {
                onSuccess('Manager successfully removed from hotel');
              }
            }}
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
  onError: PropTypes.func.isRequired,
  onSuccess: PropTypes.func.isRequired,
  hotel: PropTypes.instanceOf(Hotel).isRequired,
};

export default ManagerRowComponent;
