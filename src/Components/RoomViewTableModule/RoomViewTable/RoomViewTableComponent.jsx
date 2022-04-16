import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Table,
  TableContainer,
  TableHead,
  TableBody,
  TableFooter,
  TableCell,
  TableSortLabel,
  Paper,
  Button,
  makeStyles,
  TableRow,
  TablePagination,
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import RoomView from '../../../Models/RoomView';
import RoomViewRowComponent from '../RoomViewRow/RoomViewRowComponent';
import CreateRoomView from '../CreateRoomView';
import SearchClause from '../../../Common/BaseSearch/SearchClause';
import SearchRange from '../../../Common/BaseSearch/SearchRange';
import SearchOption from '../../../Common/BaseSearch/SearchOption';
import SearchPanel from '../../../Common/SearchPanel';

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
  roomViews,
  onError,
  onSuccess,
  createRoomView,
  updateRoomView,
  deleteRoomView,
  pageChanged,
  pageSizeChanged,
  totalCount,
  pageSize,
  onSearch,
  clauses,
  ranges,
  options,
  onChangeClauses,
  onChangeRanges,
  onChangeOptions,
  prompts,
  onOrderChanged,
  orderBy,
  order,
}) => {
  const [isAdd, setIsAdd] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowPerPage] = useState(pageSize);
  const [openSearch, setOpenSearch] = useState(false);

  const classes = useStyles();

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    pageChanged(newPage + 1);
  };

  const handleChangePageSize = (event) => {
    const newSize = parseInt(event.target.value, 10);

    // change request parameters
    pageSizeChanged(newSize);
    pageChanged(1);

    // change table parameters
    setPage(0);
    setRowPerPage(newSize);
  };

  const handleAddClose = () => {
    setIsAdd(false);
  };

  const headCells = [
    { id: 'id', numeric: false, label: 'Id' },
    { id: 'name', numeric: false, label: 'Name' },
  ];

  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === 'asc';

    onOrderChanged({ orderBy: property, order: isAsc ? 'desc' : 'asc' });
  };

  return (
    <>
      <SearchPanel
        open={openSearch}
        onOpen={() => setOpenSearch(true)}
        onClose={() => setOpenSearch(false)}
        title="Setup view search options"
        prompts={prompts}
        clauses={clauses}
        ranges={ranges}
        options={options}
        onChangeClauses={onChangeClauses}
        onChangeOptions={onChangeOptions}
        onChangeRanges={onChangeRanges}
        onSearch={onSearch}
      />

      <TableContainer component={Paper} variant="outlined">
        <Table size="small">
          <colgroup>
            <col width="20%" />
            <col width="auto" />
            <col width="2.5%" />
          </colgroup>
          <TableHead>
            <TableRow>
              {headCells.map((headCell) => (
                <TableCell
                  key={headCell.id}
                  align={headCell.numeric ? 'right' : 'left'}
                  sortDirection={orderBy === headCell.id ? order : 'asc'}
                >
                  {headCell.noOrderBy ? (
                    headCell.label
                  ) : (
                    <TableSortLabel
                      active={orderBy === headCell.id}
                      direction={orderBy === headCell.id ? order : 'asc'}
                      onClick={() => {
                        handleRequestSort(headCell.id);
                      }}
                    >
                      {headCell.label}
                    </TableSortLabel>
                  )}
                </TableCell>
              ))}
              <TableCell />
            </TableRow>
          </TableHead>
          <TableBody>
            {roomViews && roomViews.length > 0 ? (
              roomViews.map((roomView) => (
                <RoomViewRowComponent
                  key={roomView.id}
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
              <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                rowsPerPage={rowsPerPage}
                count={totalCount}
                page={page}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangePageSize}
              />
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
  roomViews: PropTypes.arrayOf(RoomView).isRequired,
  onError: PropTypes.func.isRequired,
  onSuccess: PropTypes.func.isRequired,
  createRoomView: PropTypes.func.isRequired,
  updateRoomView: PropTypes.func.isRequired,
  deleteRoomView: PropTypes.func.isRequired,
  pageChanged: PropTypes.func.isRequired,
  pageSizeChanged: PropTypes.func.isRequired,
  totalCount: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  onSearch: PropTypes.func.isRequired,
  clauses: PropTypes.arrayOf(SearchClause),
  ranges: PropTypes.arrayOf(SearchRange),
  options: PropTypes.arrayOf(SearchOption),
  onChangeClauses: PropTypes.func,
  onChangeRanges: PropTypes.func,
  onChangeOptions: PropTypes.func,
  // eslint-disable-next-line react/forbid-prop-types
  prompts: PropTypes.array,
  onOrderChanged: PropTypes.func.isRequired,
  orderBy: PropTypes.string,
  order: PropTypes.string.isRequired,
};

RoomViewTableComponent.defaultProps = {
  clauses: [],
  ranges: [],
  options: [],
  prompts: [],
  onChangeClauses: null,
  onChangeRanges: null,
  onChangeOptions: null,
  orderBy: null,
};

export default RoomViewTableComponent;
