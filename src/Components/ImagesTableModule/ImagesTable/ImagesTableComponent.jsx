import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Paper,
  TableCell,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableBody,
  TableFooter,
  Button,
  TablePagination,
  makeStyles,
} from '@material-ui/core';
import { AddOutlined } from '@material-ui/icons';
import ImageRow from '../ImageRow/ImageRow';

const useStyles = makeStyles((theme) => ({
  addButton: {
    margin: theme.spacing(1),
    border: 0,
    borderRadius: '15px',
    height: 40,
    width: 150,
    padding: theme.spacing(1),
    textAlign: 'center',
    textTransform: 'uppercase',
  },
  footer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 0,
  },
}));

const ImagesTableComponent = ({
  openCreate,
  images,
  deleteImage,
  onSuccess,
  onError,
}) => {
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

  return (
    <TableContainer component={Paper} variant="outlined">
      <Table size="small">
        <colgroup>
          <col width="auto" />
          <col width="10%" />
        </colgroup>
        <TableHead>
          <TableRow>
            <TableCell>Image</TableCell>
            <TableCell />
          </TableRow>
        </TableHead>
        <TableBody>
          {images && images.length > 0 ? (
            images
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((image) => (
                <ImageRow
                  image={image}
                  deleteImage={deleteImage}
                  onError={onError}
                  onSuccess={onSuccess}
                />
              ))
          ) : (
            <div>No images for current hotel</div>
          )}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={2} className={classes.footer}>
              <Button
                color="primary"
                className={classes.addButton}
                onClick={openCreate}
                startIcon={<AddOutlined />}
              >
                Add image
              </Button>
              <TablePagination
                variant="body"
                rowsPerPageOptions={[5, 10, 25]}
                rowsPerPage={rowsPerPage}
                count={images?.length}
                page={page}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangePageSize}
              />
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  );
};

ImagesTableComponent.propTypes = {
  openCreate: PropTypes.func.isRequired,
  images: PropTypes.arrayOf(PropTypes.string).isRequired,
  deleteImage: PropTypes.func.isRequired,
  onSuccess: PropTypes.func.isRequired,
  onError: PropTypes.func.isRequired,
};

export default ImagesTableComponent;
