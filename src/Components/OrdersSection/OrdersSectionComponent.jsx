import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core';
import FullScreenDialog from '../../Common/FullScreenDialog';
import OrdersTable from '../OrdersTable/OrdersTable';
import User from '../../Models/User';

const useStyles = makeStyles((theme) => ({
  content: {
    margin: theme.spacing(3, 7),
  },
}));

const OrderSectionComponent = ({ isOpen, close, user }) => {
  const classes = useStyles();
  return (
    <FullScreenDialog
      isOpen={isOpen}
      close={close}
      title="My reservations"
      contentComponent={
        <div className={classes.content}>
          <OrdersTable user={user} />
        </div>
      }
    />
  );
};

OrderSectionComponent.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  close: PropTypes.func.isRequired,
  user: PropTypes.instanceOf(User).isRequired,
};

export default OrderSectionComponent;
