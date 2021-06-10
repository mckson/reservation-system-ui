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
  Typography,
} from '@material-ui/core';
import { AddOutlined } from '@material-ui/icons';
import ImageRow from './ImageRow/ImageRow';
import AddImage from './ManageImage/AddImage';
import Hotel from '../../Models/Hotel';

const ImagesTable = ({ hotel, deleteImage, createImage }) => {
  const [isCreate, setIsCreate] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowPerPage] = useState(10);

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
          </colgroup>
          <TableHead>
            <TableRow>
              <TableCell>Id</TableCell>
              <TableCell>Image</TableCell>
              <TableCell />
            </TableRow>
          </TableHead>
          <TableBody>
            {hotel.images ? (
              hotel.images
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((image) => (
                  <ImageRow image={image} deleteImage={deleteImage} />
                ))
            ) : (
              <div>No images for current hotel</div>
            )}
          </TableBody>
          <TableFooter>
            <Button
              color="primary"
              onClick={() => {
                setIsCreate(!isCreate);
              }}
            >
              <AddOutlined />
              <Typography>Add image</Typography>
            </Button>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              rowsPerPage={rowsPerPage}
              count={hotel.images.length}
              page={page}
              onChangePage={handleChangePage}
              onChangeRowsPerPage={handleChangePageSize}
            />
          </TableFooter>
        </Table>
      </TableContainer>
      <AddImage
        open={isCreate}
        close={handleCreateClose}
        createImage={createImage}
        hotel={hotel}
      />
    </>
  );
};

ImagesTable.propTypes = {
  hotel: PropTypes.instanceOf(Hotel).isRequired,
  deleteImage: PropTypes.func.isRequired,
  createImage: PropTypes.func.isRequired,
};

export default ImagesTable;
