import { Pagination } from '@material-ui/lab';
import React from 'react';
import PropTypes from 'prop-types';

const PaginationBar = ({ totalPages, onPageChanged }) => {
  return (
    <div>
      <Pagination count={totalPages} onChange={onPageChanged} />
    </div>
  );
};

PaginationBar.propTypes = {
  totalPages: PropTypes.string.isRequired,
  onPageChanged: PropTypes.func.isRequired,
};

export default PaginationBar;
