import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Table,
  TableContainer,
  TableHead,
  TableBody,
  TableFooter,
  TableCell,
  Paper,
  Button,
  makeStyles,
  TableRow,
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import RoomView from '../../../Models/RoomView';
import RoomViewRowComponent from '../RoomViewRow/RoomViewRowComponent';
import CreateRoomView from '../CreateRoomView';
import Constants from '../../../Common/Constants';

const useStyles = makeStyles((theme) => ({
  addButton: {
    margin: theme.spacing(1),
    border: 0,
    borderRadius: '15px',
    height: 40,
    width: 175,
    padding: theme.spacing(1),
    textAlign: 'center',
    textTransform: 'uppercase',
  },
}));

const RoomViewTableComponent = ({
  role,
  roomViews,
  onError,
  onSuccess,
  createRoomView,
  updateRoomView,
  deleteRoomView,
}) => {
  const [isAdd, setIsAdd] = useState(false);

  const classes = useStyles();

  const handleAddClose = () => {
    setIsAdd(false);
  };

  return (
    <>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Id</TableCell>
              <TableCell>Name</TableCell>
              <TableCell />
            </TableRow>
          </TableHead>
          <TableBody>
            {roomViews && roomViews.length > 0 ? (
              roomViews.map((roomView) => (
                <RoomViewRowComponent
                  key={roomView.id}
                  role={role}
                  roomView={roomView}
                  updateRoomView={updateRoomView}
                  deleteRoomView={deleteRoomView}
                  onError={onError}
                  onSuccess={onSuccess}
                />
              ))
            ) : (
              <TableRow>No views were created yet</TableRow>
            )}
          </TableBody>
          <TableFooter>
            <TableRow>
              {role === Constants.adminRole ? (
                <TableCell>
                  <Button
                    color="primary"
                    className={classes.addButton}
                    startIcon={<AddIcon />}
                    onClick={() => setIsAdd(true)}
                  >
                    Add new view
                  </Button>
                </TableCell>
              ) : null}
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
      <CreateRoomView
        open={isAdd}
        close={handleAddClose}
        createRoomView={createRoomView}
        onSuccess={onSuccess}
      />
    </>
  );
};

RoomViewTableComponent.propTypes = {
  role: PropTypes.string.isRequired,
  roomViews: PropTypes.arrayOf(RoomView).isRequired,
  onError: PropTypes.func.isRequired,
  onSuccess: PropTypes.func.isRequired,
  createRoomView: PropTypes.func.isRequired,
  updateRoomView: PropTypes.func.isRequired,
  deleteRoomView: PropTypes.func.isRequired,
};

export default RoomViewTableComponent;
