import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Table,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  TableContainer,
  Paper,
  TableFooter,
  Button,
  TablePagination,
  TableSortLabel,
  makeStyles,
} from '@material-ui/core';
import { AddOutlined } from '@material-ui/icons';
import Service from '../../../Models/Service';
import ServiceRow from '../ServiceRow/ServiceRow';
import CreateServiceComponent from '../CreateServiceComponent';
import Hotel from '../../../Models/Hotel';
import SearchClause from '../../../Common/BaseSearch/SearchClause';
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

const ServicesTableComponent = ({
  services,
  createService,
  hotel,
  deleteService,
  updateService,
  onError,
  onSuccess,
  pageNumber,
  pageSize,
  totalCount,
  onPageChanged,
  onPageSizeChanged,
  searchVariants,
  clauses,
  onChangeClauses,
  onSearch,
  onOrderChanged,
  orderBy,
  order,
}) => {
  const [isCreate, setIsCreate] = useState(false);
  const [openSearch, setOpenSearch] = useState(false);

  const classes = useStyles();

  const handleChangePage = (event, newPage) => {
    onPageChanged(newPage + 1);
  };

  const handleChangePageSize = (event) => {
    const newSize = parseInt(event.target.value, 10);

    onPageChanged(1);
    onPageSizeChanged(newSize);
  };

  const handleCreateClose = () => {
    setIsCreate(!isCreate);
  };

  const headCells = [
    { id: 'id', numeric: false, label: 'Id' },
    { id: 'name', numeric: false, label: 'Name' },
    { id: 'price', numeric: true, label: 'Price' },
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
        title="Setup service search options"
        prompts={searchVariants}
        clauses={clauses}
        onChangeClauses={onChangeClauses}
        onSearch={onSearch}
      />
      <TableContainer component={Paper} variant="outlined">
        <Table size="small">
          <colgroup>
            <col width="20%" />
            <col width="auto" />
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
            {services != null ? (
              services.map((service) => (
                <ServiceRow
                  service={service}
                  hotel={hotel}
                  key={service.id}
                  deleteService={deleteService}
                  updateService={updateService}
                  onError={onError}
                  onSuccess={onSuccess}
                />
              ))
            ) : (
              <div>Loading</div>
            )}
          </TableBody>
          <TableFooter>
            <Button
              color="primary"
              className={classes.addButton}
              onClick={() => {
                setIsCreate(!isCreate);
              }}
              startIcon={<AddOutlined />}
            >
              Add new service
            </Button>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              rowsPerPage={pageSize}
              count={totalCount}
              page={pageNumber - 1}
              onChangePage={handleChangePage}
              onChangeRowsPerPage={handleChangePageSize}
            />
          </TableFooter>
        </Table>
      </TableContainer>
      <CreateServiceComponent
        open={isCreate}
        close={handleCreateClose}
        createService={createService}
        hotel={hotel}
        onSuccess={onSuccess}
      />
    </>
  );
};

ServicesTableComponent.propTypes = {
  services: PropTypes.arrayOf(Service).isRequired,
  hotel: PropTypes.instanceOf(Hotel).isRequired,
  createService: PropTypes.func.isRequired,
  deleteService: PropTypes.func.isRequired,
  updateService: PropTypes.func.isRequired,
  onSuccess: PropTypes.func.isRequired,
  onError: PropTypes.func.isRequired,
  onPageChanged: PropTypes.func.isRequired,
  onPageSizeChanged: PropTypes.func.isRequired,
  pageNumber: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  totalCount: PropTypes.number.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  searchVariants: PropTypes.array,
  clauses: PropTypes.arrayOf(SearchClause),
  onChangeClauses: PropTypes.func.isRequired,
  onSearch: PropTypes.func.isRequired,
  onOrderChanged: PropTypes.func.isRequired,
  orderBy: PropTypes.string,
  order: PropTypes.string.isRequired,
};

ServicesTableComponent.defaultProps = {
  searchVariants: [],
  clauses: [],
  orderBy: null,
};

export default ServicesTableComponent;
