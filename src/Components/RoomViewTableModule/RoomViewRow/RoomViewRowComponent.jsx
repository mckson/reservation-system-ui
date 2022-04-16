import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { TableRow, TableCell, IconButton } from '@material-ui/core';
import { DeleteOutlined } from '@material-ui/icons';
import RoomView from '../../../Models/RoomView';
import useRowStyles from '../../../Common/Styles/TableRowStyles';
import RoomViewRowMapComponent from '../RoomRowMap/RoomViewRowMapComponent';
import RoomViewWarningContentComponent from '../RoomViewWarningContentComponent';
import WarningDialog from '../../../Common/WarningDialog';

const RoomViewRowComponent = ({
  roomView,
  deleteRoomView,
  onError,
  onSuccess,
}) => {
  const [openWarning, setOpenWarning] = useState(false);
  const RoomViewDeletionSuccessMessage = (name) =>
    `Room view ${name} successfully deleted`;
  const classes = useRowStyles();

  const warningContent = (
    <RoomViewWarningContentComponent
      text={`Room view "${roomView?.name}" is going to be deleted. Accept or decline the deleting`}
      roomView={roomView}
    />
  );

  const deleteRoomViewAsync = async () => {
    const [deletedView, errorResponse] = await deleteRoomView(roomView.id);

    if (errorResponse) {
      onError(errorResponse);
    } else {
      onSuccess(RoomViewDeletionSuccessMessage(deletedView.name));
    }
  };

  const handleOpenWarning = () => {
    setOpenWarning(true);
  };

  const handleCloseWarning = () => {
    setOpenWarning(false);
  };

  const handleCancel = () => {
    onError('Deleting canceled');
  };

  const handleAccept = async () => {
    if (roomView) {
      await deleteRoomViewAsync();
    }
  };

  return (
    <>
      <TableRow className={classes.row}>
        <RoomViewRowMapComponent roomView={roomView} />
        <TableCell className={classes.actions}>
          <>
            <IconButton
              className={classes.button}
              onClick={() => handleOpenWarning()}
            >
              <DeleteOutlined />
            </IconButton>
          </>
        </TableCell>
      </TableRow>
      {openWarning ? (
        <WarningDialog
          title="Deleting of the view"
          open={openWarning}
          close={handleCloseWarning}
          onAccept={handleAccept}
          onCancel={handleCancel}
          cancelText="Cancel"
          acceptText="Delete view"
          type="delete"
        >
          {warningContent || null}
        </WarningDialog>
      ) : null}
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
