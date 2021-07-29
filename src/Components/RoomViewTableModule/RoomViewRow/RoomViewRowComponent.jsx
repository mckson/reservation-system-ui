import React from 'react';
import PropTypes from 'prop-types';
import { TableRow, TableCell, IconButton } from '@material-ui/core';
import { DeleteOutlined } from '@material-ui/icons';
import RoomView from '../../../Models/RoomView';
import useRowStyles from '../../../Common/Styles/TableRowStyles';
import RoomViewRowMapComponent from '../RoomRowMap/RoomViewRowMapComponent';

const RoomViewRowComponent = ({
  roomView,
  deleteRoomView,
  onError,
  onSuccess,
}) => {
  const RoomViewDeletionSuccessMessage = (name) =>
    `Room view ${name} successfully deleted`;
  const classes = useRowStyles();

  return (
    <>
      <TableRow className={classes.row}>
        <RoomViewRowMapComponent roomView={roomView} />
        <TableCell className={classes.actions}>
          <>
            <IconButton
              className={classes.button}
              onClick={async () => {
                const [deletedView, errorResponse] = await deleteRoomView(
                  roomView.id
                );

                if (errorResponse) {
                  onError(errorResponse);
                } else {
                  onSuccess(RoomViewDeletionSuccessMessage(deletedView.name));
                }
              }}
            >
              <DeleteOutlined />
            </IconButton>
          </>
        </TableCell>
      </TableRow>
    </>
  );
};

RoomViewRowComponent.propTypes = {
  roomView: PropTypes.instanceOf(RoomView).isRequired,
  deleteRoomView: PropTypes.func.isRequired,
  onError: PropTypes.func.isRequired,
  onSuccess: PropTypes.func.isRequired,
};

export default RoomViewRowComponent;
