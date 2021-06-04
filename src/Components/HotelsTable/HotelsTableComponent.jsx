import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  IconButton,
  TableRow,
  TableCell,
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableBody,
  Collapse,
  Box,
  Typography,
  makeStyles,
  TableFooter,
  TablePagination,
  Button,
} from '@material-ui/core';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import { DeleteOutlined, EditOutlined } from '@material-ui/icons';
import AddIcon from '@material-ui/icons/Add';
import Hotel from '../../Models/Hotel';
import RoomsTableComponent from '../RoomsTable/RoomsTableComponent';
import ServicesTableComponent from '../ServicesTable/ServicesTableComponent';

const useStyles = makeStyles((theme) => ({
  row: {
    '&:selected': {
      background: theme.palette.grey[300],
    },
    '& > *': {
      borderBottom: 'unset',
    },
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
    justifySelf: 'center',
  },
  footer: {},
}));

const HotelRowMap = ({ hotel }) => {
  const classes = useStyles();
  return (
    <>
      <TableCell>{hotel.id}</TableCell>
      <TableCell>{hotel.name}</TableCell>
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

const HotelRow = ({ hotel, deleteHotel }) => {
  const classes = useStyles();

  const [open, setOpen] = useState(false);
  const [openRooms, setOpenRooms] = useState(false);
  const [openServices, setOpenServices] = useState(false);
  const [selected, setSelected] = useState(false);

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
        <HotelRowMap hotel={hotel} />
        <TableCell>
          <IconButton>
            <EditOutlined />
          </IconButton>
        </TableCell>
        <TableCell className={classes.smallCell}>
          <IconButton
            onClick={() => {
              deleteHotel(hotel.id);
            }}
          >
            <DeleteOutlined />
          </IconButton>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={9}>
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
                <RoomsTableComponent rooms={hotel.rooms} />
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
    </>
  );
};

HotelRow.propTypes = {
  hotel: PropTypes.instanceOf(Hotel).isRequired,
  deleteHotel: PropTypes.func.isRequired,
};

const HotelsTableComponent = ({
  hotels,
  totalCount,
  pageChanged,
  pageSizeChanged,
  pageSize,
  deleteHotel,
}) => {
  const classes = useStyles();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowPerPage] = useState(pageSize);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    pageChanged(event, newPage + 1);
  };

  const handleChangePageSize = (event) => {
    const newSize = parseInt(event.target.value, 10);

    pageSizeChanged(newSize);

    setPage(1);
    setRowPerPage(newSize);
  };

  return (
    <TableContainer component={Paper} variant="outlined">
      <Table>
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>Id</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Country</TableCell>
            <TableCell>Region</TableCell>
            <TableCell>City</TableCell>
            <TableCell>Street</TableCell>
            <TableCell />
            <TableCell />
          </TableRow>
        </TableHead>
        <TableBody>
          {hotels != null ? (
            hotels.map((hotel) => (
              <HotelRow
                deleteHotel={deleteHotel}
                hotel={hotel}
                key={hotel.id}
              />
            ))
          ) : (
            <div>Loading</div>
          )}
        </TableBody>
        <TableFooter className={classes.footer}>
          <Button color="primary" className={classes.button}>
            <AddIcon />
            <Typography>Add new hotel</Typography>
          </Button>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            rowsPerPage={rowsPerPage}
            count={totalCount}
            page={page}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangePageSize}
          />
        </TableFooter>
      </Table>
    </TableContainer>
  );
};

HotelsTableComponent.propTypes = {
  hotels: PropTypes.arrayOf(Hotel).isRequired,
  totalCount: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  pageChanged: PropTypes.func.isRequired,
  pageSizeChanged: PropTypes.func.isRequired,
  deleteHotel: PropTypes.func.isRequired,
};

export default HotelsTableComponent;
