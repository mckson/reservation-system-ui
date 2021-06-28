import PropTypes from 'prop-types';
import User from '../../Models/User';
import OrdersSectionComponent from './OrdersSectionComponent';

const OrdersSection = ({ isOpen, close, user }) => {
  return <OrdersSectionComponent isOpen={isOpen} close={close} user={user} />;
};

OrdersSection.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  close: PropTypes.func.isRequired,
  user: PropTypes.instanceOf(User).isRequired,
};

export default OrdersSection;
