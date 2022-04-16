import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { IconButton, TableCell, TableRow, makeStyles } from '@material-ui/core';
import { DeleteOutlined, EditOutlined } from '@material-ui/icons';
import Service from '../../../Models/Service';
import ServiceRowMap from '../ServiceRowMap/ServiceRowMap';
import EditServiceComponent from '../EditServiceComponent';
import Hotel from '../../../Models/Hotel';
import WarningDialog from '../../../Common/WarningDialog';
import ServiceWarningContentComponent from '../ServiceWarningContentComponent';

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
  hotel,
  updateService,
  onSuccess,
  onRefresh,
  onAccept,
  onCancel,
  openWarning,
  onOpenWarning,
  onCloseWarning,
  warningContent,
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
            onClick={() => onOpenWarning()}
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
        onRefresh={onRefresh}
      />
      {openWarning ? (
        <WarningDialog
          title="Deleting of the view"
          open={openWarning}
          close={onCloseWarning}
          onAccept={onAccept}
          onCancel={onCancel}
          cancelText="Cancel"
          acceptText="Delete service"
          type="delete"
        >
          {warningContent || null}
        </WarningDialog>
      ) : null}
    </>
  );
};

ServiceRow.propTypes = {
  service: PropTypes.instanceOf(Service).isRequired,
  hotel: PropTypes.instanceOf(Hotel).isRequired,
  updateService: PropTypes.func.isRequired,
  onSuccess: PropTypes.func.isRequired,
  onRefresh: PropTypes.func.isRequired,
  onAccept: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  openWarning: PropTypes.bool.isRequired,
  onOpenWarning: PropTypes.func.isRequired,
  onCloseWarning: PropTypes.func.isRequired,
  warningContent: PropTypes.instanceOf(ServiceWarningContentComponent),
};

ServiceRow.defaultProps = {
  warningContent: null,
};

export default ServiceRow;
