import React from 'react';
import PropTypes from 'prop-types';
import {
  TableContainer,
  Table,
  TableRow,
  TableCell,
  makeStyles,
  Typography,
  IconButton,
} from '@material-ui/core';
import ClearOutlinedIcon from '@material-ui/icons/ClearOutlined';
import RoomFacility from '../../Models/RoomFacility';

const useStyles = makeStyles(() => ({
  content: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  row: {
    '& > *': {
      borderBottom: 'none',
    },
  },
}));

const FacilitiesTable = ({ facilities, deleteFacility }) => {
  const classes = useStyles();
  return (
    <TableContainer>
      <Table size="small">
        {facilities.map((facility) => (
          <TableRow className={classes.row}>
            <TableCell>
              <div className={classes.content}>
                <Typography>{facility.name}</Typography>
                <IconButton
                  size="small"
                  onClick={() => deleteFacility(facility)}
                >
                  <ClearOutlinedIcon />
                </IconButton>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </Table>
    </TableContainer>
  );
};

FacilitiesTable.propTypes = {
  facilities: PropTypes.arrayOf(RoomFacility),
  deleteFacility: PropTypes.func.isRequired,
};

FacilitiesTable.defaultProps = {
  facilities: [],
};

export default FacilitiesTable;
