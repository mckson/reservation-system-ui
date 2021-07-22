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
  makeStyles,
} from '@material-ui/core';
import { AddOutlined } from '@material-ui/icons';
import Service from '../../../Models/Service';
import ServiceRow from '../ServiceRow/ServiceRow';
import CreateServiceComponent from '../CreateServiceComponent';
import Hotel from '../../../Models/Hotel';

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
}) => {
  const [isCreate, setIsCreate] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowPerPage] = useState(10);

  const classes = useStyles();

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangePageSize = (event) => {
    const newSize = parseInt(event.target.value, 10);
    setPage(0);
    setRowPerPage(newSize);
  };

  const handleCreateClose = () => {
    setIsCreate(!isCreate);
  };

  return (
    <>
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
              services
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((service) => (
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
              rowsPerPage={rowsPerPage}
              count={services.length}
              page={page}
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
};

export default ServicesTableComponent;
