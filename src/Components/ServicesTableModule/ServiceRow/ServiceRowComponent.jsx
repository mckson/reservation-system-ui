import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { IconButton, TableCell, TableRow, makeStyles } from '@material-ui/core';
import { DeleteOutlined, EditOutlined } from '@material-ui/icons';
import Service from '../../../Models/Service';
import ServiceRowMap from '../ServiceRowMap/ServiceRowMap';
import EditServiceComponent from '../EditServiceComponent';
import Hotel from '../../../Models/Hotel';

const useStyles = makeStyles((theme) => ({
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
    height: '100%',
  },
}));

const ServiceRow = ({
  service,
  deleteService,
  hotel,
  updateService,
  onError,
  onSuccess,
}) => {
  const classes = useStyles();

  const [isEdit, setIsEdit] = useState(false);

  const handleEditClose = () => {
    setIsEdit(false);
  };

  return (
    <>
      <TableRow>
        <ServiceRowMap service={service} />
        <TableCell className={classes.actions}>
          <IconButton
            className={classes.button}
            onClick={() => setIsEdit(!isEdit)}
          >
            <EditOutlined />
          </IconButton>
          <IconButton
            className={classes.button}
            onClick={async () => {
              const [serviceResponse, errorResponse] = await deleteService(
                service.id
              );

              if (errorResponse) {
                onError(errorResponse);
              } else {
                onSuccess(
                  `Service ${serviceResponse.name} successfully deleted`
                );
              }
            }}
          >
            <DeleteOutlined />
          </IconButton>
        </TableCell>
      </TableRow>
      <EditServiceComponent
        service={service}
        hotel={hotel}
        open={isEdit}
        close={handleEditClose}
        updateService={updateService}
        onSuccess={onSuccess}
      />
    </>
  );
};

ServiceRow.propTypes = {
  service: PropTypes.instanceOf(Service).isRequired,
  hotel: PropTypes.instanceOf(Hotel).isRequired,
  deleteService: PropTypes.func.isRequired,
  updateService: PropTypes.func.isRequired,
  onSuccess: PropTypes.func.isRequired,
  onError: PropTypes.func.isRequired,
};

export default ServiceRow;
