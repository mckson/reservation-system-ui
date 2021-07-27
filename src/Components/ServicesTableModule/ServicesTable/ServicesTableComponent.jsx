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
  Drawer,
  makeStyles,
} from '@material-ui/core';
import { AddOutlined, SearchOutlined } from '@material-ui/icons';
import Service from '../../../Models/Service';
import ServiceRow from '../ServiceRow/ServiceRow';
import CreateServiceComponent from '../CreateServiceComponent';
import Hotel from '../../../Models/Hotel';
import BaseSearch from '../../../Common/BaseSearch/BaseSearch';
import SearchClause from '../../../Common/BaseSearch/SearchClause';

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

  return (
    <>
      <Button
        onClick={() => setOpenSearch(true)}
        startIcon={<SearchOutlined />}
      >
        Setup services search options
      </Button>
      <div className={classes.searchSection}>
        <Drawer
          open={openSearch}
          onClose={() => setOpenSearch(false)}
          classes={{ paper: classes.searchSection }}
        >
          <div>
            <BaseSearch
              prompts={searchVariants}
              clauses={clauses}
              onChangeClauses={onChangeClauses}
              onSearch={onSearch}
            />
          </div>
        </Drawer>
      </div>
      <TableContainer component={Paper} variant="outlined">
        <Table size="small">
          <colgroup>
            <col width="2.5%" />
            <col width="auto" />
            <col width="auto" />
            <col width="2.5%" />
          </colgroup>
          <TableHead>
            <TableRow>
              <TableCell>Id</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Price</TableCell>
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
};

ServicesTableComponent.defaultProps = {
  searchVariants: [],
  clauses: [],
};

export default ServicesTableComponent;
