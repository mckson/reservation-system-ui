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
  makeStyles,
} from '@material-ui/core';
import RoomsTableComponent from '../../RoomsTable/RoomsTableComponent';
import ServicesTableComponent from '../../ServicesTable/ServicesTableComponent';
import EditHotelComponent from '../Components/EditHotelComponent';
import Hotel from '../../../Models/Hotel';

const useStyles = makeStyles((theme) => ({
  row: {
    '& > *': {
      borderBottom: 'unset',
    },
    background: theme.palette.background.paper,
    '&.Mui-selected': { background: theme.palette.grey[400] },
    '&.Mui-selected:hover': { background: theme.palette.grey[300] },
  },
  smallCell: {
    flexGrow: 0.1,
  },
  cell: {
    flexGrow: 1,
  },
  subrow: {
    display: 'flex',
    alignItems: 'center',
    margin: theme.spacing(0, 5),
  },
  button: {
    margin: 0,
    color: theme.palette.primary.main,
  },
  actions: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: 'auto',
  },
}));

const HotelRowMap = ({ hotel }) => {
  const classes = useStyles();

  return (
    <>
      <TableCell>{hotel.id}</TableCell>
      <TableCell>{hotel.name}</TableCell>
      <TableCell>{hotel.numberFloors}</TableCell>
      <TableCell>{hotel.deposit}</TableCell>
      <TableCell>{hotel.location.country}</TableCell>
      <TableCell>{hotel.location.region}</TableCell>
      <TableCell>{hotel.location.city}</TableCell>
      <TableCell
        classname={classes.cell}
      >{`${hotel.location.street}, ${hotel.location.buildingNumber}`}</TableCell>
    </>
  );
};

HotelRowMap.propTypes = {
  hotel: PropTypes.instanceOf(Hotel).isRequired,
};

const HotelRowComponent = ({ hotel, deleteHotel, updateHotel, createRoom }) => {
  const classes = useStyles();

  const [open, setOpen] = useState(false);
  const [openRooms, setOpenRooms] = useState(false);
  const [openServices, setOpenServices] = useState(false);
  const [selected, setSelected] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  const handleEditClose = () => {
    setIsEdit(!isEdit);
  };

  return (
    <>
      <TableRow
        className={classes.row}
        selected={selected}
        onClick={() => setSelected(!selected)}
      >
        <TableCell>
          <IconButton onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <HotelRowMap hotel={hotel} isEdit={isEdit} />
        <TableCell className={classes.actions}>
          <IconButton
            className={classes.button}
            onClick={() => setIsEdit(!isEdit)}
          >
            <EditOutlined />
          </IconButton>
          <IconButton
            className={classes.button}
            onClick={() => {
              deleteHotel(hotel.id);
            }}
          >
            <DeleteOutlined />
          </IconButton>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={10}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box>
              <div className={classes.subrow}>
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
                  rooms={hotel.rooms}
                  createRoom={createRoom}
                  hotel={hotel}
                />
              </Collapse>
            </Box>
            <Box>
              <div className={classes.subrow}>
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
                <ServicesTableComponent services={hotel.services} />
              </Collapse>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
      <EditHotelComponent
        hotel={hotel}
        open={isEdit}
        close={handleEditClose}
        updateHotel={updateHotel}
      />
    </>
  );
};

HotelRowComponent.propTypes = {
  hotel: PropTypes.instanceOf(Hotel).isRequired,
  deleteHotel: PropTypes.func.isRequired,
  updateHotel: PropTypes.func.isRequired,
  createRoom: PropTypes.func.isRequired,
};

export default HotelRowComponent;
