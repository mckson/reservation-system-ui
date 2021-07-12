import React, { useState } from 'react';
import PropTypes from 'prop-types';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import { DeleteOutlined, EditOutlined } from '@material-ui/icons';
import {
  IconButton,
  TableRow,
  TableCell,
  Collapse,
  Box,
  Typography,
} from '@material-ui/core';
import RoomsTableComponent from '../../RoomsTable/RoomsTableComponent';
import ServicesTable from '../../ServicesTableModule/ServicesTable/ServicesTable';
import ManagersTable from '../../ManagersTableModule/ManagersTable/ManagersTable';
import EditHotelComponent from '../Components/EditHotelComponent';
import Hotel from '../../../Models/Hotel';
import HotelRowMap from '../HotelRowMap/HotelRowMap';
import User from '../../../Models/User';
import ImagesTable from '../../ImagesTableModule/ImagesTable/ImagesTable';
import Constants from '../../../Common/Constants';
import useRowStyles from '../../../Common/Styles/TableRowStyles';

const HotelRowComponent = ({
  role,
  users,
  hotel,
  deleteHotel,
  updateHotel,
  createRoom,
  updateRoom,
  deleteRoom,
  createService,
  deleteService,
  updateService,
  updateUser,
  deleteImage,
  createImage,
  createRoomImage,
  deleteRoomImage,
  onError,
  onSuccess,
}) => {
  const classes = useRowStyles();

  const [open, setOpen] = useState(false);
  const [openRooms, setOpenRooms] = useState(false);
  const [openServices, setOpenServices] = useState(false);
  const [openManagers, setOpenManagers] = useState(false);
  const [openImages, setOpenImages] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  const handleEditClose = (message) => {
    setIsEdit(!isEdit);
    console.log(message);
  };

  return (
    <>
      <TableRow className={classes.row}>
        <TableCell>
          <IconButton onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <HotelRowMap hotel={hotel} />
        <TableCell className={classes.actions}>
          {role === Constants.adminRole ? (
            <>
              <IconButton
                className={classes.button}
                onClick={() => setIsEdit(!isEdit)}
              >
                <EditOutlined />
              </IconButton>
              <IconButton
                className={classes.button}
                onClick={async () => {
                  const errorResponse = await deleteHotel(hotel.id);

                  if (errorResponse) {
                    onError(errorResponse);
                  } else {
                    onSuccess('Hotel successfully deleted');
                  }
                }}
              >
                <DeleteOutlined />
              </IconButton>
            </>
          ) : null}
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell
          style={{
            paddingBottom: 0,
            paddingTop: 0,
          }}
          colSpan={11}
        >
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box>
              <div className={classes.subrow}>
                <div className={classes.subrowTitle}>
                  <IconButton
                    onClick={() => {
                      setOpenRooms(!openRooms);
                    }}
                  >
                    {openRooms ? (
                      <KeyboardArrowUpIcon />
                    ) : (
                      <KeyboardArrowDownIcon />
                    )}
                  </IconButton>
                  <Typography variant="h6">Rooms</Typography>
                </div>
                <Collapse in={openRooms}>
                  <RoomsTableComponent
                    createRoom={createRoom}
                    updateRoom={updateRoom}
                    deleteRoom={deleteRoom}
                    createRoomImage={createRoomImage}
                    deleteRoomImage={deleteRoomImage}
                    hotel={hotel}
                    onSuccess={onSuccess}
                    onError={onError}
                  />
                </Collapse>
              </div>
            </Box>
            <Box>
              <div className={classes.subrow}>
                <div className={classes.subrowTitle}>
                  <IconButton onClick={() => setOpenServices(!openServices)}>
                    {openServices ? (
                      <KeyboardArrowUpIcon />
                    ) : (
                      <KeyboardArrowDownIcon />
                    )}
                  </IconButton>
                  <Typography variant="h6">Services</Typography>
                </div>
                <Collapse in={openServices}>
                  <ServicesTable
                    services={hotel.services}
                    createService={createService}
                    updateService={updateService}
                    deleteService={deleteService}
                    hotel={hotel}
                    onSuccess={onSuccess}
                    onError={onError}
                  />
                </Collapse>
              </div>
            </Box>
            {role === Constants.adminRole ? (
              <Box>
                <div className={classes.subrow}>
                  <div className={classes.subrowTitle}>
                    <IconButton
                      onClick={() => {
                        setOpenManagers(!openManagers);
                      }}
                    >
                      {openManagers ? (
                        <KeyboardArrowUpIcon />
                      ) : (
                        <KeyboardArrowDownIcon />
                      )}
                    </IconButton>
                    <Typography variant="h6">Managers</Typography>
                  </div>
                  <Collapse in={openManagers}>
                    <ManagersTable
                      hotel={hotel}
                      users={users}
                      updateUser={updateUser}
                      onSuccess={onSuccess}
                      onError={onError}
                    />
                  </Collapse>
                </div>
              </Box>
            ) : null}
            <Box>
              <div className={classes.subrow}>
                <div className={classes.subrowTitle}>
                  <IconButton
                    onClick={() => {
                      setOpenImages(!openImages);
                    }}
                  >
                    {openImages ? (
                      <KeyboardArrowUpIcon />
                    ) : (
                      <KeyboardArrowDownIcon />
                    )}
                  </IconButton>
                  <Typography variant="h6">Images</Typography>
                </div>
                <Collapse in={openImages} className={classes.table}>
                  <ImagesTable
                    hotelId={hotel.id}
                    images={hotel.images}
                    deleteImage={deleteImage}
                    createImage={createImage}
                    onSuccess={onSuccess}
                    onError={onError}
                  />
                </Collapse>
              </div>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
      <EditHotelComponent
        hotel={hotel}
        open={isEdit}
        close={handleEditClose}
        updateHotel={updateHotel}
        onSuccess={onSuccess}
      />
    </>
  );
};

HotelRowComponent.propTypes = {
  role: PropTypes.string.isRequired,
  users: PropTypes.arrayOf(User).isRequired,
  hotel: PropTypes.instanceOf(Hotel).isRequired,
  deleteHotel: PropTypes.func.isRequired,
  updateHotel: PropTypes.func.isRequired,
  createRoom: PropTypes.func.isRequired,
  updateRoom: PropTypes.func.isRequired,
  deleteRoom: PropTypes.func.isRequired,
  createService: PropTypes.func.isRequired,
  updateService: PropTypes.func.isRequired,
  deleteService: PropTypes.func.isRequired,
  updateUser: PropTypes.func.isRequired,
  createImage: PropTypes.func.isRequired,
  deleteImage: PropTypes.func.isRequired,
  createRoomImage: PropTypes.func.isRequired,
  deleteRoomImage: PropTypes.func.isRequired,
  onError: PropTypes.func.isRequired,
  onSuccess: PropTypes.func.isRequired,
};

export default HotelRowComponent;
