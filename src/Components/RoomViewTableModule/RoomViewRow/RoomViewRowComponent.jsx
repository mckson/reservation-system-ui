import React from 'react';
import PropTypes from 'prop-types';
import { TableRow, TableCell, IconButton } from '@material-ui/core';
import {
  DeleteOutlined,
  // EditOutlined
} from '@material-ui/icons';
import RoomView from '../../../Models/RoomView';
import useRowStyles from '../../../Common/Styles/TableRowStyles';
import RoomViewRowMapComponent from '../RoomRowMap/RoomViewRowMapComponent';
import Constants from '../../../Common/Constants';
// import EditRoomView from '../EditRoomView';

const RoomViewRowComponent = ({
  roomView,
  role,
  //   updateRoomView,
  deleteRoomView,
  onError,
  onSuccess,
}) => {
  //   const [isEdit, setIsEdit] = useState(false);

  const RoomViewDeletionSuccessMessage = (name) =>
    `Room view ${name} successfully deleted`;
  const classes = useRowStyles();

  //   const handleEditClose = () => {
  //     setIsEdit(!isEdit);
  //   };

  return (
    <>
      <TableRow className={classes.row}>
        <RoomViewRowMapComponent roomView={roomView} />
        <TableCell className={classes.actions}>
          {role === Constants.adminRole ? (
            <>
              {/* <IconButton
                className={classes.button}
                onClick={() => setIsEdit(!isEdit)}
              >
                <EditOutlined />
              </IconButton> */}
              <IconButton
                className={classes.button}
                onClick={async () => {
                  const [deletedView, errorResponse] = await deleteRoomView(
                    roomView.id
                  );

                  // eslint-disable-next-line no-debugger
                  debugger;
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
          ) : null}
        </TableCell>
      </TableRow>
      {/* <EditRoomView
        roomView={roomView}
        open={isEdit}
        close={handleEditClose}
        updateRoomView={updateRoomView}
        onSuccess={onSuccess}
      /> */}
    </>
  );
};

RoomViewRowComponent.propTypes = {
  role: PropTypes.string.isRequired,
  roomView: PropTypes.instanceOf(RoomView).isRequired,
  //   updateRoomView: PropTypes.func.isRequired,
  deleteRoomView: PropTypes.func.isRequired,
  onError: PropTypes.func.isRequired,
  onSuccess: PropTypes.func.isRequired,
};

export default RoomViewRowComponent;
