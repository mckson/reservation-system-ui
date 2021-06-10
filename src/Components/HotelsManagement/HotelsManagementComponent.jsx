import {
  Dialog,
  IconButton,
  makeStyles,
  Slide,
  Toolbar,
  Typography,
} from '@material-ui/core';
import React, { forwardRef } from 'react';
import CloseIcon from '@material-ui/icons/Close';
import PropTypes from 'prop-types';
import HotelsTable from '../HotelsTableModule/HotelsTable/HotelsTable';
import Hotel from '../../Models/Hotel';
import User from '../../Models/User';

const useStyles = makeStyles((theme) => ({
  dialogbar: {
    display: 'flex',
    justifyContent: 'space-between',
    background: theme.palette.primary.main,
    color: theme.palette.background.paper,
  },
  content: {
    margin: theme.spacing(3, 7),
  },
}));

const Transition = forwardRef(function Transistion(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const HotelsManagementComponent = ({
  users,
  isOpen,
  close,
  hotels,
  totalCount,
  pageChanged,
  pageSizeChanged,
  pageSize,
  deleteHotel,
  updateHotel,
  createHotel,
  createRoom,
  updateRoom,
  deleteRoom,
  createService,
  updateService,
  deleteService,
  updateUser,
  createImage,
  deleteImage,
}) => {
  const classes = useStyles();
  return (
    <Dialog
      fullScreen
      fullWidth
      open={isOpen}
      onClose={close}
      TransitionComponent={Transition}
    >
      <Toolbar className={classes.dialogbar}>
        <Typography variant="h6">Hotels management</Typography>
        <IconButton edge="end" color="inherit" onClick={close}>
          <CloseIcon />
        </IconButton>
      </Toolbar>
      <div className={classes.content}>
        <HotelsTable
          users={users}
          hotels={hotels}
          totalCount={totalCount}
          pageChanged={pageChanged}
          pageSize={pageSize}
          pageSizeChanged={pageSizeChanged}
          deleteHotel={deleteHotel}
          updateHotel={updateHotel}
          createHotel={createHotel}
          createRoom={createRoom}
          updateRoom={updateRoom}
          deleteRoom={deleteRoom}
          createService={createService}
          updateService={updateService}
          deleteService={deleteService}
          updateUser={updateUser}
          createImage={createImage}
          deleteImage={deleteImage}
        />
      </div>
    </Dialog>
  );
};

HotelsManagementComponent.propTypes = {
  users: PropTypes.arrayOf(User).isRequired,
  isOpen: PropTypes.bool.isRequired,
  close: PropTypes.func.isRequired,
  hotels: PropTypes.arrayOf(Hotel).isRequired,
  totalCount: PropTypes.number.isRequired,
  pageChanged: PropTypes.func.isRequired,
  pageSizeChanged: PropTypes.func.isRequired,
  pageSize: PropTypes.number.isRequired,
  deleteHotel: PropTypes.func.isRequired,
  updateHotel: PropTypes.func.isRequired,
  createHotel: PropTypes.func.isRequired,
  createRoom: PropTypes.func.isRequired,
  updateRoom: PropTypes.func.isRequired,
  deleteRoom: PropTypes.func.isRequired,
  createService: PropTypes.func.isRequired,
  updateService: PropTypes.func.isRequired,
  deleteService: PropTypes.func.isRequired,
  updateUser: PropTypes.func.isRequired,
  createImage: PropTypes.func.isRequired,
  deleteImage: PropTypes.func.isRequired,
};

export default HotelsManagementComponent;
