import { Pagination } from '@material-ui/lab';
import React from 'react';
import PropTypes from 'prop-types';

const PaginationBar = ({ totalPages, onPageChanged }) => {
  return (
    <div style={{ margin: 16 }}>
      <Pagination count={totalPages} onChange={onPageChanged} />
    </div>
  );
};

PaginationBar.propTypes = {
  totalPages: PropTypes.number,
  onPageChanged: PropTypes.func.isRequired,
};

PaginationBar.defaultProps = {
  totalPages: 0,
};

export default PaginationBar;
